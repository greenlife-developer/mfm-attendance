require("dotenv").config({
  path: "../config_files/.env",
});

const express = require("express");

const router = express.Router();

const pdf = require("html-pdf");

const pdfTemplate = require("./documents");
const { uploadFile, getFileStream } = require("./s3bucket");


var regSlip = ""

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
    regSlip = phone

    console.log("regSlip", regSlip[0])

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

    if (regSlip[0]) {
      pdf.create(pdfTemplate(data), {}).toFile(regSlip[0] + ".pdf", async(err) => {
        if (err) {
          res.send(Promise.reject());
        }

        const result = await uploadFile(regSlip[0] + ".pdf");


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
            program: req.body.program,
          },
          (err, data) => {
            res.send(Promise.resolve());
            // res.redirect("/success?message=registered");
          }
        );
      });
    }

    // console.log(req.body);

  });

  console.log("regSlip", regSlip)

  router.get("/download", (req, res) => {
    if (regSlip[0]) {
      res.sendFile(`${__dirname}/${regSlip[0]}.pdf`);
    }
  });

  // router.get("/success", (req, res) => {
  //   console.log(req.query);

  //   const query = req.query;
  //   res.render("success", {
  //     message: query.message,
  //   });
  // });

  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });
});

module.exports = router;
