require("dotenv").config({
  path: "../config_files/.env",
});

const express = require("express");

const router = express.Router();

const pdf = require("html-pdf");

const pdfTemplate = require("../documents");
const { uploadFile, getFileStream } = require("../s3bucket");

const path = require("path");

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const mongoClient = mongodb.MongoClient;

let database = null;
const bcrypt = require("bcrypt");

const db = process.env.MONGO_URI;

function getUser(userId, callBack) {
  database.collection("users").findOne(
    {
      _id: ObjectId(userId),
    },
    function (error, result) {
      if (error) {
        console.log(error);
        return;
      }
      if (callBack !== null) {
        callBack(result);
      }
    }
  );
}

mongoClient.connect(db, { useUnifiedTopology: true }, function (error, client) {
  if (error) {
    console.log(error);
    return;
  }
  database = client.db("Mfm_Attendance");

  // router.get("/", (req, res) => {
  //   res.json({
  //     name: "Opeyemi",
  //   });
  // });

  router.post("/get-phone", (req, res) => {
    const phone = req.body.phone;

    if (phone) {
      res.redirect("/register?phone=" + phone);
    }
  });

  // router.get("/register", (req, res) => {
  //     const query = req.query
  //     res.render("register", {
  //         phone: query.phone
  //     })
  // })

  router.post("/register", (req, res, next) => {
    const name = req.body.firstName + " " + req.body.lastName;
    const data = { ...req.body, name };
    console.log(req.body.phone)

    if (req.body.phone) {
    pdf
      .create(pdfTemplate(data), {})
      .toFile(`${path.join(__dirname, 'pdfdocuments/')}${req.body.phone}.pdf`, async (err) => {
        if (err) {
          res.send(Promise.reject());
        }
        res.send(Promise.resolve());

        const result = await uploadFile(`${path.join(__dirname, 'pdfdocuments/')}${req.body.phone}.pdf`);
        console.log(result.Location)

        database.collection("MfmRegistration").insertOne(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            date: req.body.date,
            gender: req.body.gender,
            maritalStatus: req.body.maritalStatus,
            position: req.body.position,
            mode: req.body.mode, 
            region: req.body.region,
            filePath: `/download/${result.key}`,
            program: req.body.program,
          },
          (err, data) => {
            // res.redirect("/success?message=registered");
          }
        );

      });
    }
  });

  router.get("/download/:phone", (req, res) => {
    const key = path.join(__dirname, 'pdfdocuments/') + req.params.phone + ".pdf";

    console.log(key)

    const readStream = getFileStream(key);

    res.attachment(key);
    readStream.pipe(res);
  });

  router.get("/logout", (req, res) => { 
    req.session = null;
    res.redirect("/");
  });


});

module.exports = router;




// {
// 	"Version": "2012-10-17",
// 	"Id": "Policy1623336260097",
// 	"Statement": [
// 		{
// 			"Sid": "Stmt1623336252847",
// 			"Effect": "Allow",
// 			"Principal": "*",
// 			"Action": "s3:GetObject",
// 			"Resource": "arn:aws:s3:::icon-path-bucket/*"
// 		}
// 	]
// }