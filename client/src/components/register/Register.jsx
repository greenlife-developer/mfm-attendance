import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import { saveAs } from "file-saver";
import "./register.css";
import { useEffect } from "react";

export default function Register() {
  const redirect = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("phone");

  const phone = query;

  return (
    <div class="form-body">
      <div class="form-wrapper">
        <div class="form-logo">
          <img src={logo} alt="" />
        </div>
        <form action="/api/register" method="POST">
          <div class="form">
            <div class="form-header">
              <h3>Oke Ado Mega Region Axis</h3>
              <p>Mobile Number Sample: 08035555800</p>
            </div>
            <div class="form-name">
              <div class="left">
                {/* <label htmlFor="first name">First Name</label>0{" "} */}
                <input type="text" name="fName" placeholder="First Name" />
              </div>
              <div class="right">
                {/* <label htmlFor="style">Last Name</label> */}
                <input type="text" name="lName" placeholder="Last Name" />
              </div>
            </div>
            <div class="signup-inputs">
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="measurement">Phone Number</label> */}
                  <input
                    type="text"
                    value={phone}
                    name="phone"
                    placeholder="Phone Number"
                  />
                </div>
                <div class="right">
                  {/* <label htmlFor="fabric">Email</label> */}
                  <input type="email" name="email" placeholder="Email" id="" />
                </div>
              </div>
              <div>
                {/* <label htmlFor="number">Address</label> */}
                <input type="text" name="address" placeholder="Address" />
              </div>
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="state">Date</label> */}
                  <input type="date" name="date" id="" />
                </div>
                <div class="right">
                  {/* <label htmlFor="gender">Gender</label> */}
                  <select class="style" name="gender">
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="state">Marital Status</label> */}
                  <select class="style" name="marital_status">
                    <option value="">Marital status</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                  </select>
                </div>
                <div class="right">
                  {/* <label htmlFor="city">Position/Title</label> */}
                  <select class="style" name="position">
                    <option value="">Position/Title</option>
                    <option value="Group/House Leader">
                      Group/House Leader
                    </option>
                    <option value="pastor">Pastor</option>
                    <option value="overseer">Overseer</option>
                    <option value="mega-overseer">Mega Regional Overseer</option>
                    <option value="region-overseer">Regional Overseer</option>
                    <option value="minister">Ministers</option>
                    <option value="seniorzonalpastor">Senior Zonal Pastor</option>
                    <option value="zonalpastor">Zonal Pastor</option>
                    <option value="actingzonalpastor">Acting Zonal Pastor</option>
                    <option value="branchpastor">Branch Pastor</option>
                    <option value="pastor's wife">Pastor's wife</option>
                    <option value="house leader">House Leader</option>
                    <option value="Worker">Worker</option>
                  </select>
                </div>
              </div>
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="state">Mode</label> */}
                  <select class="style" name="mode">
                    <option value="">Mode</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                  </select>
                </div>
                <div class="right">
                  {/* <label htmlFor="city">Region</label> */}
                  <select class="style" name="region">
                    <option value="">Region</option>
                    <option value="SW35 OKE-ADO - Mega Region">
                      SW35 OKE-ADO - Mega Region
                    </option>
                    <option value="SW34 ARAROMI">SW34 ARAROMI</option>
                    <option value="SW64 OLORUNSOGO">SW62 OLORUNSOGO</option>
                    <option value="SW73 TOTAL GARDEN">SW73 TOTAL GARDEN</option>
                    <option value="SW86 RING ROAD">SW86 RING ROAD</option>
                    <option value="SW152 I.K DAIRO">SW152 I.K DAIRO</option>
                    <option value="SW171 IDI AYUNRE">SW171 IDI AYUNRE</option>
                    <option value="SW172 ACADEMY">SW172 ACADEMY</option>
                    <option value="SW165 FELELE">SW165 FELELE</option>
                    <option value="SW198 LIVING ROCK">SW198 LIVING ROCK</option>
                    <option value="SW199 ASEGUN">SW199 ASEGUN</option>
                  </select>
                </div>
              </div>
              <div class="street">
                {/* <label htmlFor="Program">Select Program to Attend</label> */}
                <select class="style" name="program">
                  <option value="">Select Program to Attend</option>
                  <option value="RE-IGNITE RETREAT BY MRO">
                    Solemn Meeting with the GO
                  </option>
                </select>
              </div>
              <div>
                <button id="formSubmit" type="submit">
                  Register
                </button>
                {/* <input  type="submit" value="Register" /> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
