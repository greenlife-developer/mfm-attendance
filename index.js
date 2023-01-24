require("dotenv").config({
  path: "./config_files/.env",
});
// const express = require("express");
// const path = require("path");
// const bodyParser = require('body-parser');
// const app = express();

// app.use(express.json());
// app.set('view engine', 'ejs');
// app.set("views", path.resolve(__dirname, 'views'));
// app.use("/public", express.static(__dirname + "/public"));

// app.use(bodyParser.json({ limit: "10000mb" }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//     limit: "10000mb",
//     parameterLimit: 1000000,
//   })
// );



// const cookieSession = require("cookie-session");
// app.use(
//   cookieSession({
//     key: "user_id",
//     secret: "User secret object ID",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// app.use('/', require("./route"));

// // --------------------------deployment------------------------------

// if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// // --------------------------deployment------------------------------


// const PORT = process.env.PORT || 8080;

// app.listen(PORT, function () {
//   console.log("Server has started on port " + PORT + " ...");
// });



const express = require("express");
const path = require("path")

const app = express();


app.use(express.json());

const mainURL = "http://localhost:4000/";
let database = null;

let http = require("http").createServer(app);

app.use(express.json());

const expressSession = require("cookie-session");
app.use(
    expressSession({
        key: "user_id",
        secret: "User secret object ID",
        resave: true,
        saveUninitialized: true,
    })
);

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10000mb",
        parameterLimit: 1000000,
    })
);

app.use('/', require("./route"));

// --------------------------deployment------------------------------

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("Server has started on port", PORT)
})