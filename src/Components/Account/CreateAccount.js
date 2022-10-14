import axios from "axios";
import React, { useEffect, useState } from "react";

function CreateAccount() {
  const [company, setCompany] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");

  function verification(e) {
    const element = e.target;
    if (document.activeElement !== element) {
      if (password === confPassword) {
        setError("");
      } else {
        setError("Passwords Don't Match");
      }
    }
  }
  useEffect(() => {
    if (password === confPassword) {
      setError("");
    }
  }, [confPassword]);

  useEffect(() => {
    const errManager = document.getElementById("error");
    if (error === "") {
      errManager.classList.add("displayNone");
    } else {
      errManager.classList.remove("displayNone");
    }
  }, [error]);

  useEffect(() => {
    const emailEl = document.getElementById("email");
    if (email !== "") {
      if (email.includes("@")) {
        setError("");
        if (document.activeElement !== emailEl) {
          async function EmailVerify() {
            const emailObj = await axios.get(`/api/EmailVerify/${email}`);
            console.log(emailObj.data);
            if (emailObj.data.length > 0) {
              setError("A User With That Email Already Exists");
            } else {
              setError("");
            }
          }
          EmailVerify();
        }
      } else {
        setError("Please provide a valid Email");
      }
    }
  }, [email]);

  return (
    <div id="CreateAccount">
      <h1>Create Account</h1>
      <form action="/api/CreateAccount" method="post">
        <div>
          <div className="fit-content">
            <label>Full name</label>
            <input
              type={"text"}
              name="name"
              id="name"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="fit-content">
            <label htmlFor="Company">Company Name</label>
            <input
              type={"text"}
              name="company"
              id="company"
              placeholder="Company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div className="fit-content">
            <label>Email</label>
            <input
              type={"text"}
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="fit-content">
            <label>Password</label>
            <input
              type={"password"}
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="fit-content">
            <label>Confirm Password</label>
            <input
              type={"password"}
              name="confPassword"
              id="confPassword"
              placeholder="Confirm Password"
              value={confPassword}
              onChange={(e) => {
                setConfPassword(e.target.value);
              }}
              onBlur={verification}
            />
          </div>
        </div>
        <h3 id="error" className="errorManage displayNone">
          {error}
        </h3>

        <input type="submit" value="Create Account" disabled={error !== ""} />
      </form>
      <a href="/Account">Already have an Account?</a>
    </div>
  );
}

export default CreateAccount;
