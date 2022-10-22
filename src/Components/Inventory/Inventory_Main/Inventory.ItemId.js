import axios from "axios";
import React, { useState } from "react";

function ItemId() {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const ItemIdSubmission = async (e) => {
    e.preventDefault();

    const itemCheck = await axios.get(`/api/ItemCheck/${id}`);

    if (itemCheck.data) {
      let formData = new FormData();
      formData.append("itemId", id);
      formData.append("description", description);

      const res = await axios.post("/api/ItemId", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      window.location.reload();
    } else {
      const form = document.querySelector("form");
      const problem = document.createElement("h3");
      problem.classList = "errorManage";
      problem.innerHTML = "Item Id with that Name already created";

      form.appendChild(problem);
    }
  };

  return (
    <form className="ScanHome column" id="Search" onSubmit={ItemIdSubmission}>
      <h1 className="text">Item Id Creation</h1>
      <div className="row width">
        <input
          name="ItemId"
          type={"text"}
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="ItemId"
        />
        <div className="groupColor">
          <textarea
            name="description"
            rows="3"
            cols="30"
            placeholder={"Item Description"}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <input type="submit" className="space-out" value="Create Item Id" />
      </div>
    </form>
  );
}

export default ItemId;
