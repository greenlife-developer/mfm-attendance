import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import "./register.css";
import { useEffect } from "react";

export default function Register() {
  const redirect = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("phone");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [position, setPosition] = useState("");
  const [mode, setMode] = useState("");
  const [region, setRegion] = useState("");
  const [program, setProgram] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fName") {
      setFirstName(value)
    }
    if (name === "lName") {
      setLastName(value)
    }
    if (name === "email") {
      setEmail(value)
    }
    if (name === "phone") {
      setPhone(value)
    }
    if (name === "address") {
      setAddress(value)
    }
    if (name === "date") {
      setDate(value)
    }
    if (name === "gender") {
      setGender(value)
    }
    if (name === "marital_status") {
      setMaritalStatus(value)
    }
    if (name === "position") {
      setPosition(value)
    }
    if (name === "mode") {
      setMode(value)
    }
    if (name === "region") {
      setRegion(value)
    }
    if (name === "program") {
      setProgram(value)
    }
  };

  const regForm = {
    firstName,
    lastName,
    email,
    phone,
    address,
    date,
    gender,
    maritalStatus,
    position,
    mode,
    region,
    program,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/register", regForm).then((res) => {
      redirect("/success?message=registered");
    });
  };

  useEffect(() => {
    const formSubmit = document.getElementById("formSubmit");
    formSubmit.addEventListener("click", handleSubmit);
  });

  return (
    <div class="form-body">
      <div class="form-wrapper">
        <div class="form-logo">
          <img src="/public/images/logo.png" alt="" />
        </div>
        {/* action="/register" method="post"  */}
        <form onSubmit={handleSubmit}>
          <div class="form">
            <div class="form-header">
              <h3>New Ibadan Mega Region</h3>
              <p>Mobile Number Sample: 08035555800</p>
            </div>
            <div class="form-name">
              <div class="left">
                {/* <label htmlFor="first name">First Name</label>0{" "} */}
                <input
                  onChange={handleChange}
                  type="text"
                  name="fName"
                  placeholder="First Name"
                />
              </div>
              <div class="right">
                {/* <label htmlFor="style">Last Name</label> */}
                <input
                  onChange={handleChange}
                  type="text"
                  name="lName"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="signup-inputs">
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="measurement">Phone Number</label> */}
                  <input
                    type="text"
                    onChange={handleChange}
                    value={query}
                    name="phone"
                    placeholder="Phone Number"
                  />
                </div>
                <div class="right">
                  {/* <label htmlFor="fabric">Email</label> */}
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                    id=""
                  />
                </div>
              </div>
              <div>
                {/* <label htmlFor="number">Address</label> */}
                <input
                  onChange={handleChange}
                  type="text"
                  name="address"
                  placeholder="Address"
                />
              </div>
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="state">Date</label> */}
                  <input
                    onChange={handleChange}
                    type="date"
                    name="date"
                    id=""
                  />
                </div>
                <div class="right">
                  {/* <label htmlFor="gender">Gender</label> */}
                  <select onChange={handleChange} class="style" name="gender">
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="state">Marital Status</label> */}
                  <select
                    onChange={handleChange}
                    class="style"
                    name="narital_status"
                  >
                    <option value="">Marital status</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                  </select>
                </div>
                <div class="right">
                  {/* <label htmlFor="city">Position/Title</label> */}
                  <select onChange={handleChange} class="style" name="position">
                    <option value="">Position/Title</option>
                    <option value="Group/House Leader">
                      Group/House Leader
                    </option>
                    <option value="pastor">Pastor</option>
                    <option value="overseer">Overseer</option>
                    <option value="minister">Ministers</option>
                    <option value="pastors_wife">Pastor's wife</option>
                    <option value="house_leader">House Leader</option>
                  </select>
                </div>
              </div>
              <div class="form-name">
                <div class="left">
                  {/* <label htmlFor="state">Mode</label> */}
                  <select onChange={handleChange} class="style" name="mode">
                    <option value="">Mode</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                  </select>
                </div>
                <div class="right">
                  {/* <label htmlFor="city">Region</label> */}
                  <select onChange={handleChange} class="style" name="region">
                    <option value="">Region</option>
                    <option value="SW35 OKE-ADO - Mega Region">
                      SW35 OKE-ADO - Mega Region
                    </option>
                    <option value="SW34 ARAROMI">SW34 ARAROMI</option>
                    <option value="SW64 OLORUNSOGO">SW64 OLORUNSOGO</option>
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
                <select onChange={handleChange} class="style" name="program">
                  <option value="">Select Program to Attend</option>
                  <option value="SOLEMN ASSEMBLY WITH DR. DK OLUKOYA">
                    SOLEMN ASSEMBLY WITH DR. DK OLUKOYA
                  </option>
                  <option value="SKILLS AND EMPOWERMENT PROGRAM">
                    SKILLS AND EMPOWERMENT PROGRAM
                  </option>
                </select>
              </div>
              <div>
                <button id="formSubmit" type="submit">
                  <a href="/success">Register</a>
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

// if (name === "fName") {
//   return {
//     firstName: value,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// if (name === "lName") {
//   return {
//     firstName: prev.fName,
//     lastName: value,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// if (name === "email") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: value,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// if (name === "phone") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: value,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// if (name === "address") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: value,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// if (name === "date") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: value,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// if (name === "gender") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: value,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// if (name === "marital_status") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: value,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }
// // if (name === "position") {
// //   return {
// //     firstName: prev.fName,
// //     lastName: prev.lName,
// //     email: prev.email,
// //     phone: prev.phone,
// //     address: prev.address,
// //     date: prev.date,
// //     gender: prev.gender,
// //     maritalStatus: prev.marital_status,
// //     position: value,
// //     mode: prev.mode,
// //     region: prev.region,
// //     program: prev.program,
// //   };
// // }
// // if (name === "mode") {
// //   return {
// //     firstName: prev.fName,
// //     lastName: prev.lName,
// //     email: prev.email,
// //     phone: prev.phone,
// //     address: prev.address,
// //     date: prev.date,
// //     gender: prev.gender,
// //     maritalStatus: prev.marital_status,
// //     position: prev.position,
// //     mode: value,
// //     region: prev.region,
// //     program: prev.program,
// //   };
// // }
// if (name === "region") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: value,
//     program: prev.program,
//   };
// }
// if (name === "program") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: prev.position,
//     mode: prev.mode,
//     region: prev.region,
//     program: value,
//   };
// }
// if (name === "position") {
//   return {
//     firstName: prev.fName,
//     lastName: prev.lName,
//     email: prev.email,
//     phone: prev.phone,
//     address: prev.address,
//     date: prev.date,
//     gender: prev.gender,
//     maritalStatus: prev.marital_status,
//     position: value,
//     mode: prev.mode,
//     region: prev.region,
//     program: prev.program,
//   };
// }

// const [regForm, setRegForm] = useState({
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   address: "",
//   date: "",
//   gender: "r",
//   maritalStatus: "",
//   position: "",
//   mode: "",
//   region: "",
//   program: "",
// });

// const handleChange = (e) => {
//   // console.log(e.target);
//   const { name, value } = e.target;

//   console.log(name, value);

//   setRegForm((prev) => {
//     console.log("prev",prev)
//     if(prev){
//       if (name === "fName") {
//         return {
//           firstName: value,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "lName") {
//         return {
//           firstName: prev.fName,
//           lastName: value,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "email") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: value,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "phone") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: value,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "address") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: value,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "date") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: value,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "gender") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: value,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "marital_status") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: value,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       // if (name === "position") {
//       //   return {
//       //     firstName: prev.fName,
//       //     lastName: prev.lName,
//       //     email: prev.email,
//       //     phone: prev.phone,
//       //     address: prev.address,
//       //     date: prev.date,
//       //     gender: prev.gender,
//       //     maritalStatus: prev.marital_status,
//       //     position: value,
//       //     mode: prev.mode,
//       //     region: prev.region,
//       //     program: prev.program,
//       //   };
//       // }
//       if (name === "mode") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: value,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//       if (name === "region") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: value,
//           program: prev.program,
//         };
//       }
//       if (name === "program") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: prev.position,
//           mode: prev.mode,
//           region: prev.region,
//           program: value,
//         };
//       }
//       if (name === "position") {
//         return {
//           firstName: prev.fName,
//           lastName: prev.lName,
//           email: prev.email,
//           phone: prev.phone,
//           address: prev.address,
//           date: prev.date,
//           gender: prev.gender,
//           maritalStatus: prev.marital_status,
//           position: value,
//           mode: prev.mode,
//           region: prev.region,
//           program: prev.program,
//         };
//       }
//     }
//   });
// };
