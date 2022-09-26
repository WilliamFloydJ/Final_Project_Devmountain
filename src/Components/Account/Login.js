import React, { useState, useEffect } from "react";
import "../../Css/Account.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="Login">
      <h1>Hello Please Provide Your Email And Password</h1>
      <form action="/api/Login" method="post">
        <div>
          <label htmlFor="email">Email:</label>
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
        <input type={"submit"} value="Submit" />
      </form>
    </div>
  );
}

export default Login;
