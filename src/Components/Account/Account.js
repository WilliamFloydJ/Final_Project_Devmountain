import React, { useState } from "react";
import AccountInfo from "./AccountInfo";
import Password from "./Password";
import Payment from "./Payment";
import UserList from "./UserList";

function Account() {
  const [choice, setChoice] = useState(UserList);

  return (
    <div id="Account">
      <h1>Account Settings</h1>
      <div className="AccountContainer">
        <div className="AccountList">
          <h2
            onClick={() => {
              setChoice(UserList);
            }}
          >
            User List
          </h2>
          <h2
            onClick={() => {
              setChoice(Payment);
            }}
          >
            Payment Methods
          </h2>
          <h2
            onClick={() => {
              setChoice(Password);
            }}
          >
            Password Manager
          </h2>
          <h2
            onClick={() => {
              setChoice(AccountInfo);
            }}
          >
            Account Info
          </h2>
        </div>
        <div id="content">{choice}</div>
      </div>
    </div>
  );
}

export default Account;
