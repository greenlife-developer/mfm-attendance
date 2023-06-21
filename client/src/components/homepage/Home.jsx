import React, { useEffect } from "react";
import logo from "../images/logo.png";
import "aos/dist/aos.css";
import "./style.css";

export default function Home() {

  const handlePhoneChange = (e) => {
    console.log(e.target.value);
    const phone = e.target.value;

    localStorage.setItem("phone", phone);
  };

  return (
    <>
      <div class="first-page">
        <div class="navigation">
          <div class="container home">
            <div class="big-logo">
              <form action="/api/get-phone" method="post">
                <h3>Oke-Ado Mega Region Axis</h3>
                <p>Mobile Number Sample: 08035555800</p>
                <input
                  onChange={handlePhoneChange}
                  type="phone"
                  name="phone"
                  placeholder="Enter Your phone e.g: 08035555800"
                  required
                />
                <br />
                <button type="submit" class="btn btn-warning">
                  Submit
                </button>
              </form>
            </div>
            <div class="phone-container">
              <div class="phone-items">
                <img src={logo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
