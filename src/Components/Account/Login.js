import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/Account.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function loginSubmission(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await axios.post("/api/Login", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 204) {
      setError(res.data);
      const error = document.getElementById("error");
      error.classList.remove("displayNone");
    } else if (res.status === 200) {
      document.location.reload();
    }
  }

  return (
    <div id="Login">
      <h1>Login:</h1>
      <form onSubmit={loginSubmission}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type={"email"}
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
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
        <input type={"submit"} value="Login" />
      </form>
      <h1 id="error" className="errorManage displayNone">
        {error}
      </h1>
      <a href="/CreateAccount">Create Account</a>
    </div>
  );
}

export default Login;
