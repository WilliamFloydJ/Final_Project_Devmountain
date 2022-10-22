import React, { useEffect, useState } from "react";
import QrRecoveryHomeSection from "../QR/QR.Recovery.Home.Section";
import qrCreationSubmission from "../../../Functions/qrCreationSubmission";

function LocationCreation() {
  const [containerOption, setContainerOption] = useState("company");
  const [containerLocation, setContainerLocation] = useState("");
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [itemId, setItemId] = useState("");
  const [scannerBool, setScannerBool] = useState(false);
  const [quantity, setQuantity] = useState(0);

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
    <form
      id="QRForm"
      className="ScanHome InventoryForm"
      onSubmit={(e) =>
        qrCreationSubmission(
          e,
          scannerBool,
          containerOption,
          containerLocation,
          productId,
          description,
          itemId,
          true,
          quantity
        )
      }
    >
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
          description={description}
          setDescription={setDescription}
          itemId={itemId}
          setItemId={setItemId}
          containerOption={containerOption}
          setContainerLocation={setContainerLocation}
          setScannerBool={setScannerBool}
          displayDesc={true}
          quantity={0}
          setQuantity={setQuantity}
          displayQty={false}
        />
        <QrRecoveryHomeSection
          name="box"
          product={productId}
          setProduct={setProductId}
          description={description}
          setDescription={setDescription}
          itemId={itemId}
          setItemId={setItemId}
          containerOption={containerOption}
          setContainerLocation={setContainerLocation}
          setScannerBool={setScannerBool}
          displayDesc={true}
          quantity={quantity}
          setQuantity={setQuantity}
          displayQty={true}
        />
        <QrRecoveryHomeSection
          name="location"
          product={productId}
          setProduct={setProductId}
          description={description}
          setDescription={setDescription}
          itemId={itemId}
          setItemId={setItemId}
          containerOption={containerOption}
          setContainerLocation={setContainerLocation}
          setScannerBool={setScannerBool}
          displayDesc={true}
          quantity={0}
          setQuantity={setQuantity}
          displayQty={false}
        />
        <QrRecoveryHomeSection
          name="warehouse"
          product={productId}
          setProduct={setProductId}
          description={description}
          setDescription={setDescription}
          itemId={itemId}
          setItemId={setItemId}
          containerOption={containerOption}
          setContainerLocation={setContainerLocation}
          setScannerBool={setScannerBool}
          displayDesc={true}
          quantity={0}
          setQuantity={setQuantity}
          displayQty={false}
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
          <div className="groupColor">
            <textarea
              name="description"
              rows="3"
              cols="30"
              placeholder={"Company Description"}
              value={description}
              id="textarea"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </div>

      <input type={"submit"} value={"Create QR Code"} id="submitBtn" />
      <a href="/Inventory/QRRecovery" className="qrCreationLink">
        Want To Recover An Already Created Location?
      </a>
    </form>
  );
}

export default LocationCreation;
