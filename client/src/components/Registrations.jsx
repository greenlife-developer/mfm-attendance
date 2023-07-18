import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import RegCard from "./RegCard";

export default function Registrations() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [registers, setRegisters] = useState("0");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      console.log("Record: ", record);
      
      setRegisters(record.registers.length)
      setRegistrations(record.registers);
    }

    fetchData();

    return;
  }, [navigate]);

  const handleDownload = (path, phone) => {
    axios.get(`${path}`, { responseType: "blob" }).then((res) => {
      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      saveAs(pdfBlob, `${phone}.pdf`);
    });
  };

  return (
    <div>
      <div className="search">
        <div className="registers">
          <p>{registers}</p>
        </div>
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Start typing a phone number"
        />
      </div>
      <div className="added-margin"></div>
      {registrations
        ? registrations
            .filter((item) => {
              if (keyword === "") {
                return item;
              } else if (
                item.phone.toLowerCase().includes(keyword.toLowerCase())
              ) {
                return item;
              }
              return "";
            })
            .map((reg, index) => {
              return (
                // <h1>Hello {index}</h1>
                <div className="data-presentation">
                  <div className="card">
                    <table>
                      <tr>
                        <td>Name</td>
                        <td>{reg.firstName + " " + reg.lastName}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{reg.email}</td>
                      </tr>
                      <tr>
                        <td>Phone No.</td>
                        <td>{reg.phone}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{reg.gender}</td>
                      </tr>
                      <tr>
                        <td>Marital Status</td>
                        <td>{reg.maritalStatus}</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>{reg.address}</td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>{reg.position}</td>
                      </tr>
                      <tr>
                        <td>Region</td>
                        <td>{reg.region}</td>
                      </tr>
                      <tr>
                        <td>Program</td>
                        <td>{reg.program}</td>
                      </tr>
                    </table>
                    <div className="download-card">
                      <a
                        onClick={() => {
                          handleDownload(reg.filePath, reg.phone);
                        }}
                      >
                        Download Slip
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
        : "All Registrations will appear here"}
    </div>
  );
}
