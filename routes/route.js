require("dotenv").config({
  path: "../config_files/.env",
});
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const express = require("express");

const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');

const axios = require('axios');
const FormData = require('form-data');
const Mustache = require('mustache');



const pdf = require("html-pdf");

const pdfTemplate = require("../documents");
const { uploadFile, getFileStream } = require("../s3bucket");

const path = require("path");

const s3 = new AWS.S3({
  AWS_SDK_LOAD_CONFIG: 1,
  region: "us-east-2",
  accessKeyId: "AKIASJKPO373UCQOEC4V",
  secretAccessKey: "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",
})

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

  router.get("/", (req, res) => {
    database.collection("MfmRegistration").find().sort({
      "createdAt": -1
    }).toArray((err, registration) => {
      res.json({
        "isLogin": true,
        "query": req.query,
        "registers": registration
      })
    })
  });

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

  router.post("/register", (req, res) => {
    const name = req.body.fName + " " + req.body.lName;
    const data = { ...req.body, name };

    const dataItem = {
      invoiceNumber: "#12345"
    }

    const generation = {
      html: 'template.html',
    };

    const template = fs.readFileSync('./template.html', { encoding: 'utf8' });
    const filledTemplate = Mustache.render(template, data);

    const body = new FormData();
    body.append('template.html', template, { filename: "template.html" });
    body.append('template.html', filledTemplate, { filename: "template.html" });
    body.append('generation', JSON.stringify(generation));

    (async () => {
      const response = await axios.post('http://localhost:5000/process', body, {
        headers: body.getHeaders(),
        responseType: 'stream',
      });
      await response.data.pipe(fs.createWriteStream('invoice.pdf'));
    })();

    // pdf.create(pdfTemplate(data), {}).toFile(path.join(__dirname, `pdfdocuments/${req.body.phone}.pdf`), async (err) => {
    //   if (err) {
    //     return console.log('error', err);
    //   }
    //   Promise.resolve()

    //   const pdfFile = await path.join(__dirname, `pdfdocuments/${req.body.phone}.pdf`);

    //   const fileData = fs.readFileSync(pdfFile);


    //   const params = {
    //     Bucket: "icon-path-bucket",
    //     Body: fileData,
    //     Key: req.body.phone,
    //     ContentEncoding: "base64",
    //     contentType: "application/pdf"
    //   }

    //   console.log("loooooooooooonnnng body", params.Body)

    //   await s3.upload(params, (err, data) => {
    //     if (data) {
    //       database.collection("MfmRegistration").insertOne(
    //         {
    //           firstName: req.body.fName,
    //           lastName: req.body.lName,
    //           email: req.body.email,
    //           phone: req.body.phone,
    //           address: req.body.address,
    //           date: req.body.date,
    //           gender: req.body.gender,
    //           maritalStatus: req.body.marital_status,
    //           position: req.body.position,
    //           mode: req.body.mode,
    //           region: req.body.region,
    //           filePath: `/api/download/${data.key}`,
    //           program: req.body.program,
    //         },
    //         (err, data) => {
    //           res.redirect(`/success?message=${req.body.phone}`);
    //         }
    //       );
    //     } else {
    //       console.log("This is the Response", err, "data", data)
    //     }
    //   });
    // });

    // pdf.create(pdfTemplate(data)).toStream((err, file) => {
    //   // await stream.pipe(fs.createWriteStream(`${req.body.phone}.pdf`));
    //   const params = {
    //     Bucket: "icon-path-bucket",
    //     Body: file !== undefined ? file : "",
    //     Key: req.body.phone,
    //     contentType: "application/pdf"
    //   }

    //   console.log("loooooooooooonnnng body", params.Body)

    //   s3.upload(params, (err, data) => {
    //     if (data) {
    //       database.collection("MfmRegistration").insertOne(
    //         {
    //           firstName: req.body.fName,
    //           lastName: req.body.lName,
    //           email: req.body.email,
    //           phone: req.body.phone,
    //           address: req.body.address,
    //           date: req.body.date,
    //           gender: req.body.gender,
    //           maritalStatus: req.body.marital_status,
    //           position: req.body.position,
    //           mode: req.body.mode,
    //           region: req.body.region,
    //           filePath: `/api/download/${data.key}`,
    //           program: req.body.program,
    //         },
    //         (err, data) => {
    //           res.redirect(`/success?message=${req.body.phone}`);
    //         }
    //       );
    //     } else {
    //       console.log("This is the Response", err, "data", data)
    //     }
    //   });
    // });
  });

  router.get("/download/:phone", (req, res) => {
    // const key = path.join(__dirname, 'pdfdocuments/') + req.params.phone + ".pdf";

    // console.log(key)

    const readStream = getFileStream(`${req.params.phone}`);

    res.attachment(`${req.params.phone}`);
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