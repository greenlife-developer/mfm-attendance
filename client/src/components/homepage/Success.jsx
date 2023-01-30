import React from "react";
import axios from "axios";
import logo from "../images/logo.png"
import { saveAs } from "file-saver";

export default function Success() {
  const handleDownload = () => {
    const phone = localStorage.getItem("phone")
    axios
      .get(`/download/${phone}`, { responseType: "blob" })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `${phone}.pdf`);
      });
  };

  return (
    <div class="form-body success">
      <div class="form-wrapper">
        <div class="form-logo">
          <img src={logo} alt="" />
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
