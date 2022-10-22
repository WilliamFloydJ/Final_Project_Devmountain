import axios from "axios";
import { useState } from "react";
import qrReader from "./qrReader.js";

async function InventorySearchSub(
  e,
  query,
  containerOption,
  shift,
  scan,
  file
) {
  // const [itemCheck, setItemCheck] = useState(false);
  let itemCheck = false;
  let newContainerOption = containerOption;

  e.preventDefault();

  function shift0(div) {
    e.preventDefault();

    const selfTitle = document.createElement("div");
    selfTitle.className = "cell self";
    selfTitle.innerHTML =
      res.data.location[0][0].name || res.data.location[0][0].itemid;

    div.appendChild(selfTitle);

    const selfDescription = document.createElement("div");
    selfDescription.className = "cell self";
    selfDescription.innerHTML = res.data.location[0][0].description || "";

    div.appendChild(selfDescription);

    console.log(res.data.location[0][0].parent_location);

    const selfParentLocation = document.createElement("div");
    selfParentLocation.className = "cell self parent";
    selfParentLocation.innerHTML =
      res.data.location[0][0].parent_location || res.data.location[0][0].itemid
        ? "Item Id"
        : "Company";

    div.appendChild(selfParentLocation);

    if (res.data.location[0][0].item_name) {
      itemCheck = true;
      const selfItemId = document.createElement("div");
      selfItemId.className = "cell self";
      selfItemId.innerHTML = res.data.location[0][0].item_name || "Company";

      div.appendChild(selfItemId);
    }

    if (newContainerOption.split("_")[0] === "box") {
      const headerQuantity = document.createElement("div");
      headerQuantity.className = "header";
      headerQuantity.innerHTML = "Quantity";
      div.classList.add("grid5");

      div.appendChild(headerQuantity);
    }
  }

  let res;

  if (file) {
    const read = await qrReader("");

    console.log(read);

    if (read.split("@").length > 1) {
      switch (read.split("@").length) {
        case 1:
          newContainerOption = "company_names";
          break;
        case 2:
          newContainerOption = "warehouse_names";
          break;
        case 3:
          newContainerOption = "location_names";
          break;
        case 4:
          newContainerOption = "box_names";
          break;
        case 5:
          newContainerOption = "product_names";
          break;
        default:
          newContainerOption = "company_names";
          break;
      }
    }

    console.log(newContainerOption);

    let newQuery;

    switch (read.split("@").length) {
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
      default:
        newQuery = "company_names";
        break;
    }

    res = await axios.get(
      `/api/InventorySearch?query=${
        read.split("@")[read.split("@").length - 1]
      }&filter=${newQuery}`
    );
  } else if (scan) {
    let newQuery;

    if (query.split("@").length > 1) {
      switch (query.split("@").length) {
        case 1:
          newContainerOption = "company_names";
          break;
        case 2:
          newContainerOption = "warehouse_names";
          break;
        case 3:
          newContainerOption = "location_names";
          break;
        case 4:
          newContainerOption = "box_names";
          break;
        case 5:
          newContainerOption = "product_names";
          break;
        default:
          newContainerOption = "company_names";
          break;
      }
    }

    switch (query.split("@").length) {
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
      default:
        newQuery = "company_names";
    }

    res = await axios.get(
      `/api/InventorySearch?query=${
        query.split("@")[query.split("@") - 1]
      }&filter=${newQuery}`
    );
  } else {
    res = await axios.get(
      `/api/InventorySearch?query=${query}&filter=${newContainerOption}`
    );
  }

  if (res.data === "reload") {
    window.location.reload();
  } else if (res.data.seqBox || res.data.seqProduct) {
    e.preventDefault();
    if (
      res.data.seqBox[0].length !== 0 ||
      res.data.seqProduct[0].length !== 0
    ) {
      for (let p = 0; p < 2; p++) {
        const shiftArr = document.getElementsByClassName(`shift${shift + p}`);
        for (let i of shiftArr) {
          i.remove();
        }
      }
      const div = document.createElement("div");
      div.className = `grid shift${shift}`;
      div.id = `gridRes${shift}`;

      if (shift === 0) {
        shift0(div);
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
      headerParentLocation.className = "header parent";
      headerParentLocation.innerHTML = "Location";

      div.appendChild(headerParentLocation);

      for (let i = 0; i < res.data.seqBox[0].length; i++) {
        const { name, description, parent_location, quantity } =
          res.data.seqBox[0][i];
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

        div.appendChild(cellTitle);

        const cellDescription = document.createElement("div");
        cellDescription.className = `cell ${i}name`;
        if (description) {
          cellDescription.innerHTML = description;
        } else {
          cellDescription.innerHTML = " ";
        }

        div.appendChild(cellDescription);

        const cellParentLocation = document.createElement("div");
        cellParentLocation.className = `cell ${i}name parent`;
        if (parent_location) {
          cellParentLocation.innerHTML = parent_location;
        } else {
          cellParentLocation.innerHTML = " ";
        }

        div.appendChild(cellParentLocation);

        div.classList.add("grid4");
        const divNodes = [...div.childNodes];
        for (const node of divNodes) {
          if (
            node.classList.contains("header") &&
            node.classList.contains("parent")
          ) {
            console.log({ node });
            const headerQuantity = document.createElement("div");
            headerQuantity.className = "header";
            headerQuantity.innerHTML = "Quantity";
            node.parentNode.insertBefore(headerQuantity, node.nextSibling);
          } else if (
            node.classList.contains("parent") &&
            node.classList.contains(`${i}name`) === false
          ) {
            const emptyEl = document.createElement("div");
            node.parentNode.insertBefore(emptyEl, node.nextSibling);
          }
        }
        const cellQuantity = document.createElement("div");
        cellQuantity.className = `cell ${i}name`;
        cellQuantity.innerHTML = res.data.seqBox[0][i].quantity;
        div.appendChild(cellQuantity);
      }

      for (let i = 0; i < res.data.seqProduct[0].length; i++) {
        const { name, description, parent_location } =
          res.data.seqProduct[0][i];
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

        div.appendChild(cellTitle);

        const cellDescription = document.createElement("div");
        cellDescription.className = `cell ${i}name`;
        if (description) {
          cellDescription.innerHTML = description;
        } else {
          cellDescription.innerHTML = " ";
        }

        div.appendChild(cellDescription);

        const cellParentLocation = document.createElement("div");
        cellParentLocation.className = `cell ${i}name parent`;
        if (parent_location) {
          cellParentLocation.innerHTML = parent_location;
        } else {
          cellParentLocation.innerHTML = " ";
        }

        div.appendChild(cellParentLocation);
      }
      const form = document.querySelector("form");
      form.appendChild(div);
    }
  } else {
    if (res.data.seq) {
      if (res.data.seq[0].length !== 0) {
        for (let p = 0; p < 4; p++) {
          const shiftArr = document.getElementsByClassName(`shift${shift + p}`);
          for (let i of shiftArr) {
            i.remove();
          }
        }

        if (document.getElementById("item_def")) {
          document.getElementById("item_def").remove();
        }

        const div = document.createElement("div");
        div.className = `grid shift${shift}`;
        div.id = `gridRes${shift}`;

        if (shift === 0) {
          shift0(div);
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
        headerParentLocation.className = "header parent";
        headerParentLocation.innerHTML = "Location";

        div.appendChild(headerParentLocation);

        if (itemCheck) {
          const headerItemId = document.createElement("div");
          headerItemId.className = "header";
          headerItemId.innerHTML = "Item Id";

          div.appendChild(headerItemId);
        }

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

          div.appendChild(cellTitle);

          const cellDescription = document.createElement("div");
          cellDescription.className = `cell ${i}name`;
          if (description) {
            cellDescription.innerHTML = description;
          } else {
            cellDescription.innerHTML = " ";
          }

          div.appendChild(cellDescription);

          const cellParentLocation = document.createElement("div");
          cellParentLocation.className = `cell ${i}name parent`;
          if (parent_location) {
            cellParentLocation.innerHTML = parent_location;
          } else {
            cellParentLocation.innerHTML = " ";
          }

          div.appendChild(cellParentLocation);

          if (res.data.seq[0][i].item_name) {
            if (itemCheck === false) {
              div.classList.add("grid4");
              const divNodes = [...div.childNodes];
              for (const node of divNodes) {
                if (
                  node.classList.contains("header") &&
                  node.classList.contains("parent")
                ) {
                  const headerItemId = document.createElement("div");
                  headerItemId.className = "header ID";
                  headerItemId.innerHTML = "Item Id";
                  node.parentNode.insertBefore(headerItemId, node.nextSibling);
                } else if (
                  node.classList.contains("parent") &&
                  node.classList.contains(`${i}name`) === false
                ) {
                  const emptyEl = document.createElement("div");
                  node.parentNode.insertBefore(emptyEl, node.nextSibling);
                }
              }
            }
            itemCheck = true;
            const cellItemId = document.createElement("div");
            cellItemId.className = `cell title ${i}name`;
            cellItemId.innerHTML = res.data.seq[0][i].item_name;
            cellItemId.onclick = async () => {
              const div = document.createElement("div");
              div.className = `grid grid1 shift${shift + 1}`;
              if (document.getElementById("item_def")) {
                document.getElementById("item_def").remove();
              }
              div.id = "item_def";

              const headerItemDes = document.createElement("div");
              headerItemDes.className = "header";
              headerItemDes.innerHTML = "Item Id Description";

              div.appendChild(headerItemDes);

              const itemDefRes = await axios.get(
                `/api/ItemSearch/${res.data.seq[0][i].item_name}`
              );
              const cellItemDes = document.createElement("div");
              cellItemDes.className = "cell";
              console.log(itemDefRes.data[0][0].description);
              cellItemDes.innerHTML = itemDefRes.data[0][0].description;

              div.appendChild(cellItemDes);
              const form = document.querySelector("form");
              form.appendChild(div);
            };
            div.appendChild(cellItemId);
          }

          if (res.data.type.split("_")[0] === "box") {
            div.classList.add("grid5");
            const divNodes = [...div.childNodes];
            for (const node of divNodes) {
              if (
                node.classList.contains("header") &&
                node.classList.contains("ID")
              ) {
                const headerQuantity = document.createElement("div");
                headerQuantity.className = "header";
                headerQuantity.innerHTML = "Quantity";
                node.parentNode.insertBefore(headerQuantity, node.nextSibling);
              } else if (
                node.classList.contains("parent") &&
                node.classList.contains("header") === false &&
                node.classList.contains(`${i}name`) === false
              ) {
                const emptyEl = document.createElement("div");
                node.parentNode.insertBefore(emptyEl, node.nextSibling);
              }
            }
            const cellQuantity = document.createElement("div");
            cellQuantity.className = `cell title ${i}name`;
            cellQuantity.innerHTML = res.data.seq[0][i].quantity;
            div.appendChild(cellQuantity);
          }
        }
        const form = document.querySelector("form");
        form.appendChild(div);
      } else {
        if (shift === 0) {
          const div = document.createElement("div");
          div.className = `grid shift${shift}`;
          div.id = `gridRes${shift}`;

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
          if (res.data.location[0][0].item_name) {
            console.log("working");
            itemCheck = true;
            const selfItemId = document.createElement("div");
            selfItemId.className = "cell self";
            selfItemId.innerHTML =
              res.data.location[0][0].item_name || "Company";

            div.appendChild(selfItemId);
          }

          if (res.data.column.split("_")[0] === "box") {
            const selfQuantity = document.createElement("div");
            selfQuantity.className = "cell self";
            selfQuantity.innerHTML = res.data.location[0][0].quantity;

            div.appendChild(selfQuantity);
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

          if (itemCheck) {
            const headerItemId = document.createElement("div");
            headerItemId.className = "header";
            headerItemId.innerHTML = "Item Id";
            div.classList.add("grid4");

            div.appendChild(headerItemId);
          }

          if (res.data.column.split("_")[0] === "box") {
            const headerQuantity = document.createElement("div");
            headerQuantity.className = "header";
            headerQuantity.innerHTML = "Quantity";
            div.classList.add("grid5");

            div.appendChild(headerQuantity);
          }

          const form = document.querySelector("form");
          form.appendChild(div);
        } else {
          for (let p = 0; p < 4; p++) {
            const shiftArr = document.getElementsByClassName(
              `shift${shift + p}`
            );
            for (let i of shiftArr) {
              i.remove();
            }
          }

          if (document.getElementById("item_def")) {
            document.getElementById("item_def").remove();
          }
        }
      }
    }
  }
}

export default InventorySearchSub;
