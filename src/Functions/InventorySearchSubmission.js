import axios from "axios";
import qrReader from "./qrReader.js";

async function InventorySearchSub(
  e,
  query,
  containerOption,
  shift,
  scan,
  file
) {
  e.preventDefault();

  let res;

  if (file) {
    const newQuery = await qrReader("");
    res = await axios.get(
      `/api/InventorySearch?query=${newQuery}&filter=${containerOption}`
    );
  } else if (scan) {
    let newQuery;

    switch (scan.split("@").length) {
      case 1:
        newQuery = "company_names";
        break;
      case 2:
        newQuery = "warehouse_names";
        break;
      case 3:
        newQuery = "location_names";
        break;
      case 4:
        newQuery = "box_names";
        break;
      case 5:
        newQuery = "product_names";
        break;
    }

    res = await axios.get(
      `/api/InventorySearch?query=${newQuery}&filter=${containerOption}`
    );
  } else {
    res = await axios.get(
      `/api/InventorySearch?query=${query}&filter=${containerOption}`
    );
  }

  if (res.data === "reload") {
    window.location.reload();
  } else {
    if (res.data.seq) {
      if (res.data.seq[0].length !== 0) {
        const shiftArr = document.getElementsByClassName(`shift${shift}`);
        for (let i of shiftArr) {
          i.remove();
        }

        const div = document.createElement("div");
        div.className = `grid shift${shift}`;
        div.id = "gridRes";

        if (shift === 0) {
          const selfTitle = document.createElement("div");
          selfTitle.className = "cell self";
          selfTitle.innerHTML = res.data.location[0][0].name;

          div.appendChild(selfTitle);

          const selfDescription = document.createElement("div");
          selfDescription.className = "cell self";
          selfDescription.innerHTML = res.data.location[0][0].description || "";

          div.appendChild(selfDescription);

          const selfParentLocation = document.createElement("div");
          selfParentLocation.className = "cell self";
          selfParentLocation.innerHTML =
            res.data.location[0][0].parent_location || "Company";

          div.appendChild(selfParentLocation);
        }

        const headerTitle = document.createElement("div");
        headerTitle.className = "header";
        headerTitle.innerHTML = "Name";

        div.appendChild(headerTitle);

        const headerDescription = document.createElement("div");
        headerDescription.className = "header";
        headerDescription.innerHTML = "Description";

        div.appendChild(headerDescription);

        const headerParentLocation = document.createElement("div");
        headerParentLocation.className = "header";
        headerParentLocation.innerHTML = "Location";

        div.appendChild(headerParentLocation);

        for (let i = 0; i < res.data.seq[0].length; i++) {
          const { name, description, parent_location } = res.data.seq[0][i];
          const { type } = res.data;

          const cellTitle = document.createElement("div");
          cellTitle.className = `cell title ${i}name`;
          cellTitle.innerHTML = name;
          cellTitle.onclick = (ce) => {
            const change = document.getElementsByClassName(`shift${shift}`);
            for (let c of change) {
              for (let ch of c.children) {
                if (ch.classList.contains(`${i}name`)) {
                  ch.classList.add("highlight");
                } else {
                  ch.classList.remove("highlight");
                }
              }
            }
            InventorySearchSub(ce, name, type, shift + 1, false);
          };

          const cellDescription = document.createElement("div");
          cellDescription.className = `cell ${i}name`;
          if (description) {
            cellDescription.innerHTML = description;
          } else {
            cellDescription.innerHTML = " ";
          }

          const cellParentLocation = document.createElement("div");
          cellParentLocation.className = `cell ${i}name`;
          if (parent_location) {
            cellParentLocation.innerHTML = parent_location;
          } else {
            cellParentLocation.innerHTML = " ";
          }

          div.appendChild(cellTitle);
          div.appendChild(cellDescription);
          div.appendChild(cellParentLocation);
        }
        const form = document.querySelector("form");
        form.appendChild(div);
      }
    }
  }
}

export default InventorySearchSub;
