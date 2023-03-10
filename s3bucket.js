require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');

const BucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;


const s3 = new AWS.S3({
  AWS_SDK_LOAD_CONFIG: 1,
  region: "us-east-2",
  accessKeyId: "AKIASJKPO373UCQOEC4V",
  secretAccessKey: "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",
})


// Uploads to s3 
async function uploadFile(file) {

  console.log(file)
  const fileStream = fs.createReadStream(file)

  const params = {
    Bucket: "icon-path-bucket",
    Body: fileStream,
    Key: file,
    contentType: "application/pdf"
  }

  const res = await new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => error == null ? resolve(data) : reject(error))
  })

  return { fileUrl: res.Location }
}

exports.uploadFile = uploadFile




// Downloads from s3 
function getFileStream(key) {
  const downloadParams = {
    Key: key,
    Bucket: "icon-path-bucket"
  }

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream