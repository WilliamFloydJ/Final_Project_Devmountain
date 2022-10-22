import axios from "axios";
import React, { useEffect, useState } from "react";

function SalesOrder() {
  const today = new Date();
  const todayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [date, setDate] = useState(todayDate);
  const [query, setQuery] = useState("");

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

    resCont.id = "res";

    headerId.textContent = "Order Id";
    headerItemId.textContent = "Item Id";
    headerQuantity.textContent = "Quantity";
    headerDate.textContent = `Date`;
    headerCustomer.textContent = "Customer";

    headerId.className = "text header";
    resCont.classList = "grid grid5 switchBackground";
    headerItemId.className = "text header";
    headerQuantity.className = "text header";
    headerDate.className = "text header";
    headerCustomer.className = "text header";

    resCont.appendChild(headerId);
    resCont.appendChild(headerItemId);
    resCont.appendChild(headerQuantity);
    resCont.appendChild(headerDate);
    resCont.appendChild(headerCustomer);

    for (const x of res.data[0]) {
      const id = document.createElement("h1");
      const itemId = document.createElement("h1");
      const quantity = document.createElement("h1");
      const date = document.createElement("h1");
      const customer = document.createElement("h1");

      const dateArr = x.date.split("-");

      id.textContent = x.sales_order_id;
      itemId.textContent = x.itemid;
      quantity.textContent = x.quantity;
      date.textContent = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
      customer.textContent = x.customer_id;

      id.className = "text cell";
      itemId.className = "text cell";
      quantity.className = "text cell";
      date.className = "text cell";
      customer.className = "text cell";

      resCont.appendChild(id);
      resCont.appendChild(itemId);
      resCont.appendChild(quantity);
      resCont.appendChild(date);
      resCont.appendChild(customer);
    }
    const search = document.getElementById("search");
    search.appendChild(resCont);
  }

  async function salesOrderSubmission(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("type", "SalesOrder");
    formData.append("itemId", itemId);
    formData.append("quantity", quantity);
    formData.append("date", date);
    formData.append("customer", customer);

    const res = await axios.post("/api/Sales", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    window.location.reload();
  }

  return (
    <form
      className="ScanHome column SalesOrder"
      id="Search"
      onSubmit={salesOrderSubmission}
    >
      <h1 className="text">Sales Order</h1>
      <div className="row width">
        <input
          name="ItemId"
          type={"text"}
          value={itemId}
          onChange={(e) => {
            setItemId(e.target.value);
          }}
          placeholder="ItemId"
        />
        <div className="column space-out groupColor">
          <label htmlFor="Quantity">Quantity:</label>
          <input
            name="Quantity"
            type={"number"}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            placeholder="Quantity"
          />
        </div>

        <div className="column space-out groupColor">
          <label htmlFor="Date">Due Date:</label>
          <input
            name="Date"
            type={"date"}
            value={date}
            min={todayDate}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>

        <div className="column space-out groupColor">
          <label htmlFor="Customer">Customer ID</label>
          <input
            name="Customer"
            type={"number"}
            value={customer}
            onChange={(e) => {
              setCustomer(e.target.value);
            }}
          />
        </div>

        <input type="submit" className="space-out" value="Create Sales Order" />
      </div>
      <div className="space-outTopHeavy groupColor column" id="search">
        <div className="row">
          <div className="column center">
            <label htmlFor="search">Search:</label>
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
    </form>
  );
}

export default SalesOrder;
