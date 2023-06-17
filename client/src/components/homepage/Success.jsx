import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import { saveAs } from "file-saver";

export default function Success() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("message");

  const phone = query;
  console.log("phone: ", phone)

  const [registers, setRegisters] = useState("")

  useEffect(() => {
      axios.get("/api").then((data) =>{
        if(data){
          const downloadable = data.data.registers.filter((download) => {
            return download.filePath === `/api/download/${phone}`
          })
          setRegisters(downloadable[0].filePath)
          console.log("Downloadable: ", downloadable[0].filePath)
        }
        console.log(data.data.registers[0].filePath)
      })
  })

  const handleDownload = () => {
    axios.get(`${registers}`, { responseType: "blob" }).then((res) => {
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
