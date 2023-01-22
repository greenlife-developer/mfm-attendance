require("dotenv").config({
  path: "./config_files/.env",
});
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();

const { saveAs }  = require('file-saver');
app.use(express.json());
app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, 'views'));
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10000mb",
    parameterLimit: 1000000,
  })
);



const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    key: "user_id",
    secret: "User secret object ID",
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', require("./routes/route"));

app.get('/download', (req, res) => {
  const pdfBlob = new Blob([res.body], { type: 'application/pdf' });
  saveAs(pdfBlob, 'newPdf.pdf');
  
  res.sendFile(`${__dirname}/result.pdf`)
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("Server has started on port " + PORT + " ...");
});
