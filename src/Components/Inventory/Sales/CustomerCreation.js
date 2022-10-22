import axios from "axios";
import React, { useEffect, useState } from "react";

function CustomerCreation() {
  const [compName, setCompName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("");
  const [query, setQuery] = useState("");

  async function search() {
    if (document.getElementById("res")) {
      document.getElementById("res").classList.add("displayNone");
    }

    const select = document.getElementById("filter");
    const filter = select.options[select.selectedIndex].value;
    const res = await axios.get(`/api/Sales/${query}/customer_names/${filter}`);

    const resCont = document.createElement("div");
    const headerId = document.createElement("h1");
    const headerCompName = document.createElement("h1");
    const headerCustomer = document.createElement("h1");
    const headerAddress = document.createElement("h1");
    const headerShipping = document.createElement("h1");

    resCont.id = "res";

    headerId.textContent = "Customer Id";
    headerCompName.textContent = "Company Name";
    headerCustomer.textContent = "Contact Info";
    headerAddress.textContent = "Main Address";
    headerShipping.textContent = "Shipping";

    headerId.className = "text header";
    headerCompName.className = "text header";
    headerCustomer.className = "text header";
    headerAddress.className = "text header";
    headerShipping.className = "text header";
    resCont.classList = "grid grid5 switchBackground";

    resCont.appendChild(headerId);
    resCont.appendChild(headerCompName);
    resCont.appendChild(headerCustomer);
    resCont.appendChild(headerAddress);
    resCont.appendChild(headerShipping);

    for (const x of res.data[0]) {
      const id = document.createElement("h1");
      const compName = document.createElement("h1");
      const customer = document.createElement("h1");
      const address = document.createElement("h1");
      const shipping = document.createElement("h1");

      id.textContent = x.customer_names_id;
      compName.textContent = x.name;
      customer.textContent = x.customer;
      address.textContent = x.address;
      shipping.textContent = x.shipping;

      id.className = "text cell";
      compName.className = "text cell";
      customer.className = "text cell";
      address.className = "text cell";
      shipping.className = "text cell";

      resCont.appendChild(id);
      resCont.appendChild(compName);
      resCont.appendChild(customer);
      resCont.appendChild(address);
      resCont.appendChild(shipping);
    }
    const search = document.getElementById("search");
    search.appendChild(resCont);
  }

  async function customerSubmission(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("type", "Customer");
    formData.append("compName", compName);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("shipping", shipping);

    const res = await axios.post("/api/Sales", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    window.location.reload();
  }

  return (
    <form
      className="ScanHome column Customer"
      id="Search"
      onSubmit={customerSubmission}
    >
      <h1 className="text">Customer Creation</h1>
      <div className="row width">
        <input
          name="Name"
          type={"text"}
          value={compName}
          onChange={(e) => {
            setCompName(e.target.value);
          }}
          placeholder="Company Name"
        />
        <div className="column space-out groupColor">
          <label htmlFor="Contact">Contact Info:</label>
          <input
            name="Contact"
            type={"text"}
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
            }}
            placeholder="Contact Email and or Phone Number"
          />
        </div>

        <div className="column space-out groupColor">
          <label htmlFor="Address">Main Address:</label>
          <textarea
            name="Address"
            rows="4"
            cols="30"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="column space-out groupColor">
          <label htmlFor="Shipping">Shipping Preferences:</label>
          <textarea
            name="Shipping"
            rows="4"
            cols="30"
            placeholder="Shipping Preferences"
            value={shipping}
            onChange={(e) => {
              setShipping(e.target.value);
            }}
          ></textarea>
        </div>

        <input type="submit" className="space-out" value="Create Customer" />
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
              <option value="name">Name of the Customer</option>
              <option value="customer">Customer Info</option>
              <option value="customer_names_id">Customer Number</option>
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

export default CustomerCreation;
