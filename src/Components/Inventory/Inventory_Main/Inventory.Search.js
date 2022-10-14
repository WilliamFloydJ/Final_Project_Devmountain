import React, { useState } from "react";
import InventorySearchSub from "../../../Functions/InventorySearchSubmission";
import qrScanningFunc from "../../../Functions/qrScanningFunc";

function InventorySearch() {
  const [query, setQuery] = useState("");
  const [containerOption, setContainerOption] = useState("product_names");
  const [scannerBool, setScannerBool] = useState(false);
  const [fileBool, setFileBool] = useState(false);

  const options = [
    { value: "product_names", label: "Individual Product" },
    { value: "box_names", label: "Container - Smallest Storage Method" },
    {
      value: "location_names",
      label: "Location - Containing Smaller Containers",
    },
    {
      value: "warehouse_names",
      label: "Warehouse - Containing Smaller Locations",
    },
    {
      value: "company_names",
      label: "Company or Branch - Containing Separate Warehouses",
    },
  ];

  return (
    <form
      onSubmit={(e) =>
        InventorySearchSub(e, query, containerOption, 0, scannerBool, fileBool)
      }
      className="ScanHome column"
      id="Search"
    >
      <h1 className="text">Inventory Search</h1>

      <div className="row width">
        <div className="column">
          <label htmlFor="select">Filter Search Options</label>
          <select
            value={containerOption}
            onChange={(e) => {
              setContainerOption(e.target.value);
            }}
            id="selectBtn"
            name="select"
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            name="query"
            className="space-outTop"
            placeholder="Search Term"
          />
        </div>

        <div id="FileManager" className="fileManager">
          <input
            id="QrCodeFile"
            name="file"
            type="file"
            onChange={() => {
              setFileBool(true);
            }}
            accept={".png, .gif, .jpeg, .jpg"}
          />
          <h2 id="Or">OR</h2>
          <button
            onClick={() => qrScanningFunc("", setQuery, setScannerBool)}
            id="QrScanner"
            type="button"
          >
            qrScanner
          </button>
        </div>

        <input
          type="submit"
          className="space-out space-outTopHeavy"
          value="Search Inventory"
        />
      </div>
    </form>
  );
}

export default InventorySearch;
