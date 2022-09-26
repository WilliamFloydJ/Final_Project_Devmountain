import React, { useState } from "react";

import "../../Css/Inventory.css";

function SideBar() {
  const [dropDown, setDropDown] = useState([]);
  const [previousDropName, setPreviousDropName] = useState("");

  function dropDownOpen(dropDownName) {
    if (previousDropName !== "") {
      console.log(document.getElementById(previousDropName));
      console.log(dropDown);
      document
        .getElementById(previousDropName)
        .parentElement.classList.remove("open");
    }
    setDropDown(Array.from(document.getElementById(dropDownName).children));
    document.getElementById(dropDownName).parentElement.classList.add("open");
    setPreviousDropName(dropDownName);
  }

  return (
    <aside>
      <ul>
        <button onClick={(event) => dropDownOpen("QR")}>
          QR Codes
          <div id="QR">
            <a href="/Inventory/QRScan">Scan QR</a>

            <a href="/Inventory/QRCreation">Create QR</a>
          </div>
        </button>
        <button onClick={(event) => dropDownOpen("inventory")}>
          Inventory
          <div id="inventory">
            <a href="/Inventory/InventoryList">Inventory List</a>

            <a href="/Inventory/LocationCreation">Location Creation</a>

            <a href="/Inventory/ProductCreation">Product Creation</a>

            <a href="/Inventory/Preferences">Inventory Preferences</a>
          </div>
        </button>

        <button onClick={(event) => dropDownOpen("sales")}>
          Sales
          <div id="sales">
            <a href="/Inventory/SalesOrder">Sales Orders</a>

            <a href="/Inventory/DeliveryOrder">Delivery Orders</a>

            <a href="/Inventory/ReturnRequest">Return Request</a>

            <a href="/Inventory/ReturnOrder">Return Order</a>

            <a href="/Inventory/CustomerCreation">Customer Creation</a>
          </div>
        </button>

        <button onClick={(event) => dropDownOpen("purchasing")}>
          Purchasing
          <div id="purchasing">
            <a href="/Inventory/PurchaseOrder">Purchase Order</a>
          </div>
        </button>

        <button onClick={(event) => dropDownOpen("accounting")}>
          Accounting
          <div id="accounting">
            <a href="/Inventory/ACInvoicing">Account Invoicing</a>
          </div>
        </button>

        <button onClick={(event) => dropDownOpen("HR")}>
          Human Resources
          <div id="HR">
            <a href="/Inventory/EmployeeCreation">Employee Creation</a>

            <a href="/Inventory/EmployeeRecord">Employee Record</a>
          </div>
        </button>
      </ul>
      <div id="view">
        {dropDown.map((elm, ind) => {
          return (
            <a key={ind} href={elm.href}>
              {elm.innerHTML}
            </a>
          );
        })}
      </div>
    </aside>
  );
}

export default SideBar;
