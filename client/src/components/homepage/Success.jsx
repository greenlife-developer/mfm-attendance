import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";

export default function Success() {
  const handleDownload = () => {
    axios
      .get("/download", { responseType: "blob" })
    //   .then((res) => {
    //     res.json();
    //   })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  return (
    <div class="form-body success">
      <div class="form-wrapper">
        <div class="form-logo">
          <img src="/public/images/logo.png" alt="" />
        </div>
        <div class="form">
          <h3>
            Congratulations!!! You have successfully registered. Please download
            your registration slip below
          </h3>
          <br />
          <br />
          <a onClick={handleDownload}>
            Download Slip
          </a>
        </div>
      </div>
    </div>
  );
}
