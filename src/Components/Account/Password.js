import axios from "axios";
import React, { useState } from "react";

function Password() {
  // const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function resetPassword() {
    // const res = await axios.put(`/api/password/${password}/${newPassword}`);
  }

  return (
    <div>
      <h1>Password Manager</h1>
      <input
        type="password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        placeholder="Old Password"
      />
      <input
        type="text"
        // value={newPassword}
        // onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <input type="button" onClick={resetPassword} value={"Reset Password"} />
    </div>
  );
}

export default Password;
