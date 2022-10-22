import axios from "axios";
import React, { useEffect, useState } from "react";
import qrScanningFunc from "../../../Functions/qrScanningFunc";
import qrReader from "../../../Functions/qrReader";

function DeliveryOrder() {
  const today = new Date();
  const todayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(todayDate);
  const [customer, setCustomer] = useState(0);
  const [weight, setWeight] = useState(0);
  const [query, setQuery] = useState("");
  const [queryD, setQueryD] = useState("");
  const [scannerBool, setScannerBool] = useState(true);
  const [salesOrderId, setSalesOrderId] = useState(0);

  let locationArr = [];
  async function locationAdd(loc) {
    const location = document.getElementById("location");

    if (scannerBool) {
      if (locationArr.includes(loc) === false) {
        if (loc) {
          locationArr.push(loc);
          const h1 = document.createElement("h1");
          h1.textContent = loc;
          h1.classList = "text small groupColor";
          location.appendChild(h1);
          console.log(locationArr);
        }
      }
    } else {
      const res = await qrReader("");
      if (res) {
        if (locationArr.includes(res) === false) {
          locationArr.push(res);
          const h1 = document.createElement("h1");
          h1.textContent = res;
          h1.classList = "text small groupColor";
          location.appendChild(h1);
          console.log(locationArr);
        }
      }
    }
  }

  function funcUse(e, id, quantity, date, customer, orderId) {
    if (document.getElementById("res")) {
      document.getElementById("res").classList.add("displayNone");
    }
    e.preventDefault();
    setItemId(id);
    setQuantity(quantity);
    setDate(date);
    setCustomer(customer);
    setSalesOrderId(orderId);
    const order = document.getElementById("order");
    order.classList.remove("displayNone");
  }
  async function search() {
    if (document.getElementById("res")) {
      const res = document.getElementById("res");
      const resArr = res.children;
      for (const child of resArr) {
        child.remove();
      }
      res.remove();
    }

    const select = document.getElementById("filter");
    const filter = select.options[select.selectedIndex].value;
    const res = await axios.get(`/api/Sales/${query}/sales_order/${filter}`);

    const resCont = document.createElement("div");
    const headerId = document.createElement("h1");
    const headerItemId = document.createElement("h1");
    const headerQuantity = document.createElement("h1");
    const headerDate = document.createElement("h1");
    const headerCustomer = document.createElement("h1");
    const emptyDiv = document.createElement("div");

    resCont.id = "res";

    headerId.textContent = "Order Id";
    headerItemId.textContent = "Item Id";
    headerQuantity.textContent = "Quantity";
    headerDate.textContent = `Date`;
    headerCustomer.textContent = "Customer";

    headerId.className = "text header";
    resCont.classList = "grid grid6 switchBackground";
    headerItemId.className = "text header";
    headerQuantity.className = "text header";
    headerDate.className = "text header";
    headerCustomer.className = "text header";

    resCont.appendChild(headerId);
    resCont.appendChild(headerItemId);
    resCont.appendChild(headerQuantity);
    resCont.appendChild(headerDate);
    resCont.appendChild(headerCustomer);
    resCont.appendChild(emptyDiv);

    for (const x of res.data[0]) {
      const id = document.createElement("h1");
      const itemId = document.createElement("h1");
      const quantity = document.createElement("h1");
      const date = document.createElement("h1");
      const customer = document.createElement("h1");
      const use = document.createElement("input");

      use.type = "button";
      use.onclick = (e) =>
        funcUse(
          e,
          x.itemid,
          x.quantity,
          x.date,
          x.customer_id,
          x.sales_order_id
        );

      const dateArr = x.date.split("-");

      id.textContent = x.sales_order_id;
      itemId.textContent = x.itemid;
      quantity.textContent = x.quantity;
      date.textContent = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
      customer.textContent = x.customer_id;
      use.value = "Use";

      id.className = "text cell";
      itemId.className = "text cell";
      quantity.className = "text cell";
      date.className = "text cell";
      customer.className = "text cell";
      use.className = "text cell";

      resCont.appendChild(id);
      resCont.appendChild(itemId);
      resCont.appendChild(quantity);
      resCont.appendChild(date);
      resCont.appendChild(customer);
      resCont.appendChild(use);
    }
    const search = document.getElementById("search");
    search.appendChild(resCont);
  }

  async function searchDelivery() {
    if (document.getElementById("resD")) {
      const resD = document.getElementById("resD");
      const resDArr = resD.children;
      for (const child of resDArr) {
        child.remove();
      }
      resD.remove();
    }

    const select = document.getElementById("filterD");
    const filter = select.options[select.selectedIndex].value;
    const res = await axios.get(
      `/api/Sales/${queryD}/delivery_order/${filter}`
    );

    const resCont = document.createElement("div");
    const headerDeliveryId = document.createElement("h1");
    const headerSalesId = document.createElement("h1");
    const headerItemId = document.createElement("h1");
    const headerQuantity = document.createElement("h1");
    const headerWeight = document.createElement("h1");
    const headerDate = document.createElement("h1");

    resCont.id = "resD";

    headerDeliveryId.textContent = "Delivery Order Id";
    headerSalesId.textContent = "Sales Order Id";
    headerItemId.textContent = "Item Id";
    headerQuantity.textContent = "Quantity";
    headerWeight.textContent = "Weight";
    headerDate.textContent = `Date`;

    headerDeliveryId.className = "text header";
    headerSalesId.className = "text header";
    resCont.classList = "grid grid6 switchBackground";
    headerItemId.className = "text header";
    headerQuantity.className = "text header";
    headerWeight.className = "text header";
    headerDate.className = "text header";

    resCont.appendChild(headerDeliveryId);
    resCont.appendChild(headerSalesId);
    resCont.appendChild(headerItemId);
    resCont.appendChild(headerQuantity);
    resCont.appendChild(headerWeight);
    resCont.appendChild(headerDate);

    for (const x of res.data[0]) {
      const salesId = document.createElement("h1");
      const deliveryId = document.createElement("h1");
      const itemId = document.createElement("h1");
      const quantity = document.createElement("h1");
      const date = document.createElement("h1");
      const weight = document.createElement("h1");

      const dateArr = x.date.split("-");

      salesId.textContent = x.delivery_order_id;
      deliveryId.textContent = x.sales_order_id;
      itemId.textContent = x.itemid;
      quantity.textContent = x.quantity;
      weight.textContent = x.weight;
      date.textContent = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;

      salesId.className = "text cell";
      deliveryId.className = "text cell";
      itemId.className = "text cell";
      quantity.className = "text cell";
      date.className = "text cell";
      weight.className = "text cell";

      resCont.appendChild(salesId);
      resCont.appendChild(deliveryId);
      resCont.appendChild(itemId);
      resCont.appendChild(quantity);
      resCont.appendChild(weight);
      resCont.appendChild(date);
    }
    const search = document.getElementById("searchDelivery");
    search.appendChild(resCont);
  }

  async function DeliverySubmission(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("type", "Delivery");
    formData.append("weight", weight);
    formData.append("quantity", quantity);
    formData.append("orderId", salesOrderId);
    formData.append("box", JSON.stringify(locationArr));
    const res = await axios.post("/api/Sales", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    window.location.reload();
  }

  return (
    <form
      className="ScanHome column Delivery"
      id="Search"
      onSubmit={DeliverySubmission}
    >
      <h1 className="text">Delivery Order</h1>
      <div className="row width displayNone deliveryCreate" id="order">
        <h1 className="text groupColor">{itemId}</h1>
        <div className="column space-out groupColor">
          <label htmlFor="Quantity">Quantity:</label>
          <h1 name="Quantity" className="text">
            {quantity}
          </h1>
        </div>
        <div className="column space-out groupColor">
          <label htmlFor="Weight">Weight:</label>
          <input
            name="Weight"
            type={"number"}
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            placeholder="Weight"
          />
        </div>
        <div className="column center" id="location">
          <div id="FileManager" className="fileManager">
            <input
              id="QrCodeFile"
              name="file"
              type="file"
              onChange={() => {
                setScannerBool(false);
              }}
              accept={".png, .gif, .jpeg, .jpg"}
            />
            <h2 id="Or">OR</h2>
            <button
              onClick={() => qrScanningFunc("", locationAdd, setScannerBool)}
              id="QrScanner"
              type="button"
            >
              qrScanner
            </button>
          </div>
          <button
            className="space-out space-outTop"
            type="button"
            onClick={locationAdd}
          >
            Submit Location
          </button>
        </div>

        <div className="column space-out groupColor">
          <label htmlFor="Date">Due Date:</label>
          <h1 name="Date" className="text">
            {date}
          </h1>
        </div>
        <input
          type="submit"
          className="space-out"
          value="Create Delivery Order"
        />
      </div>
      <div className="space-outTopHeavy groupColor column" id="search">
        <div className="row">
          <div className="column center">
            <label htmlFor="search">Search Sales Order:</label>
            <input
              name="search"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search"
            />

            <label htmlFor="Filter">Filter:</label>
            <select name="Filter" id="filter">
              <option value="itemid">Item ID in Order</option>
              <option value="date">Due Date</option>
              <option value="sales_order_id">Order Number</option>
            </select>
          </div>
          <button type="button" onClick={search} className="space-out">
            Search
          </button>
        </div>
      </div>
      <div className="space-outTopHeavy groupColor column" id="searchDelivery">
        <div className="row">
          <div className="column center">
            <label htmlFor="search">Search Delivery Order:</label>
            <input
              name="search"
              type="text"
              value={queryD}
              onChange={(e) => {
                setQueryD(e.target.value);
              }}
              placeholder="Search"
            />

            <label htmlFor="Filter">Filter:</label>
            <select name="Filter" id="filterD">
              <option value="delivery_order_id">Delivery Order Number</option>
              <option value="itemid">Item Id</option>
              <option value="customer_id">Customer Id Number</option>
              <option value="sales_order_id">Sales Order Number</option>
            </select>
          </div>
          <button type="button" onClick={searchDelivery} className="space-out">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default DeliveryOrder;
