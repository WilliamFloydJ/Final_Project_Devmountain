import React, { useEffect, useState } from "react";
import Password from "./Password";
import Payment from "./Payment";
import UserList from "./UserList";

function Account() {
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    const list = document.getElementById("list");
    const listChild = list.children;
    const chosen = document.getElementById("chosen");
    if (chosen) {
      chosen.classList.add("displayNone");
      chosen.id = "";
    }

    listChild[choice].classList.remove("displayNone");
    listChild[choice].id = "chosen";
  }, [choice]);

  return (
    <div id="Account">
      <h1>Account Settings</h1>
      <div className="AccountContainer">
        <div className="AccountList">
          <h2
            onClick={() => {
              setChoice(0);
            }}
          >
            User List
          </h2>
          <h2
            onClick={() => {
              setChoice(1);
            }}
          >
            Payment Methods
          </h2>
          <h2
            onClick={() => {
              setChoice(2);
            }}
          >
            Password Manager
          </h2>
        </div>
        <div id="content">
          <ul id="list">
            <li className="displayNone">
              <UserList />
            </li>
            <li className="displayNone">
              <Payment />
            </li>
            <li className="displayNone">
              <Password />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
