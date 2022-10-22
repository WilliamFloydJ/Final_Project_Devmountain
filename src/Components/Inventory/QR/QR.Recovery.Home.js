import React, { useEffect, useState } from "react";
import QrRecoveryHomeSection from "./QR.Recovery.Home.Section";
import qrCreationSubmission from "../../../Functions/qrCreationSubmission";
import "../../../Css/QR.css";

function QRRecoveryHome() {
  const [containerOption, setContainerOption] = useState("product");
  const [containerLocation, setContainerLocation] = useState("");
  const [productId, setProductId] = useState("");
  const [scannerBool, setScannerBool] = useState(false);

  const displayDesc = false;

  useEffect(() => {
    const container = document.getElementById("Container");
    const containerChildren = Array.from(container.children);

    containerChildren.forEach((el) => {
      const childEl = document.getElementById(el.id);
      if (el.id === containerOption) {
        childEl.classList.remove("displayNone");
        childEl.classList.add("displayFlex");
      } else {
        childEl.classList.remove("displayFlex");
        childEl.classList.add("displayNone");
      }
    });
  }, [containerOption]);

  const options = [
    { value: "product", label: "Individual Product" },
    { value: "box", label: "Container - Smallest Storage Method" },
    { value: "location", label: "Location - Containing Smaller Containers" },
    { value: "warehouse", label: "Warehouse - Containing Smaller Locations" },
    {
      value: "company",
      label: "Company or Branch - Containing Separate Warehouses",
    },
  ];

  return (
    <div>
      <form
        id="QRForm"
        className="ScanHome column"
        onSubmit={(e) =>
          qrCreationSubmission(
            e,
            scannerBool,
            containerOption,
            containerLocation,
            productId,
            false
          )
        }
      >
        <h1 className="text">QR Scanner</h1>
        <div className="row width">
          <select
            value={containerOption}
            onChange={(e) => {
              setContainerOption(e.target.value);
            }}
            id="selectBtn"
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
          <div id="Container">
            <QrRecoveryHomeSection
              name="product"
              product={productId}
              setProduct={setProductId}
              containerOption={containerOption}
              setContainerLocation={setContainerLocation}
              setScannerBool={setScannerBool}
              displayDesc={displayDesc}
            />
            <QrRecoveryHomeSection
              name="box"
              product={productId}
              setProduct={setProductId}
              containerOption={containerOption}
              setContainerLocation={setContainerLocation}
              setScannerBool={setScannerBool}
              displayDesc={displayDesc}
            />
            <QrRecoveryHomeSection
              name="location"
              product={productId}
              setProduct={setProductId}
              containerOption={containerOption}
              setContainerLocation={setContainerLocation}
              setScannerBool={setScannerBool}
              displayDesc={displayDesc}
            />
            <QrRecoveryHomeSection
              name="warehouse"
              product={productId}
              setProduct={setProductId}
              containerOption={containerOption}
              setContainerLocation={setContainerLocation}
              setScannerBool={setScannerBool}
              displayDesc={displayDesc}
            />
            <div id="company" className="displayNone">
              <div id="companyContainer" className="displayFlex">
                <input
                  type={"text"}
                  value={productId}
                  onChange={(e) => {
                    setProductId(e.target.value);
                  }}
                  placeholder="Company ID"
                />
              </div>
            </div>
          </div>

          <input type={"submit"} value={"Recover QR Code"} id="submitBtn" />
        </div>
      </form>
      <a href="/Inventory/LocationCreation" className="qrCreationLink">
        Want To Create A Location?
      </a>
    </div>
  );
}

export default QRRecoveryHome;
