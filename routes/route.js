require("dotenv").config({
    path: "../config_files/.env",
});

const express = require("express")

const router = express.Router()

const pdf = require("html-pdf")

const pdfTemplate = require('../documents');




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

mongoClient.connect(
    db,
    { useUnifiedTopology: true },
    function (error, client) {
        if (error) {
            console.log(error);
            return;
        }
        database = client.db("Mfm_Attendance");

        router.get("/", (req, res) => {
            database
                .collection("users")
                .find()
                .sort({
                    createdAt: -1,
                })
                .toArray((err, users) => {
                    if (req.session.user_id) {
                        getUser(req.session.user_id, function (user) {
                            res.render("home", {
                                isLogin: true,
                                query: req.query,
                                user: user,
                                users: users,
                            });
                        });
                    } else {
                        res.render("home", {
                            isLogin: false,
                            query: req.query,
                            users: users,
                        });
                    }
                });
        });

        router.post("/get-phone", (req, res) => {
            const phone = req.body.phone
            if (phone !== "") {
                res.redirect("/register?phone=" + phone);
            }
        })

        router.get("/register", (req, res) => {
            const query = req.query
            res.render("register", {
                phone: query.phone
            })
        })


        router.post("/register", (req, res) => {
            const name = req.body.fName + " " + req.body.lName;
            const data = { ...req.body, name }
            pdf.create(pdfTemplate(data), {}).toFile('result.pdf', (err) => {
                if (err) {
                    res.send(Promise.reject());
                }

                res.send(Promise.resolve());
            });

            database.collection("users").insertOne(
                {
                    firstName: req.body.fName,
                    lastName: req.body.lName,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    date: req.body.date,
                    gender: req.body.gender,
                    maritalStatus: req.body.marital_status,
                    position: req.body.position,
                    mode: req.body.mode,
                    region: req.body.region,
                    program: req.body.program
                },
                (err, data) => {
                    // res.redirect("/success?message=registered");
                }
            );
        });

        router.get("/success", (req, res) => {
            console.log(req.query)

            const query = req.query
            res.render("success", {
                message: query.message
            })

        })


        router.get("/logout", (req, res) => {
            req.session = null;
            res.redirect("/");
        });
    }
);

module.exports = router;