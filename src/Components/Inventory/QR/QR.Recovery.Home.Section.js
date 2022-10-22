import React from "react";
import qrScanningFunc from "../../../Functions/qrScanningFunc";

function QrRecoveryHomeSection(props) {
  function setContainerFunc(loc) {
    props.setContainerLocation(loc);
  }

  return (
    <div id={props.name} className="displayNone">
      <div id={props.name + "Container"} className="displayFlex">
        <div className="fitContent">
          <input
            type={"text"}
            value={props.product}
            onChange={(e) => {
              props.setProduct(e.target.value);
            }}
            placeholder={props.name + "ID"}
          />
          {props.displayQty ? (
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type={"number"}
                value={props.quantity}
                name="quantity"
                onChange={(e) => {
                  props.setQuantity(e.target.value);
                }}
                placeholder={props.name + " Quantity"}
              />
            </div>
          ) : null}
        </div>

        <div
          className={props.displayDesc ? "groupColor space-out" : "displayNone"}
          id="createDes"
        >
          <textarea
            name="description"
            rows="3"
            cols="30"
            placeholder={props.name + " Description"}
            value={props.description}
            onChange={(e) => {
              props.setDescription(e.target.value);
            }}
          ></textarea>
          {props.name === "box" || props.name === "product" ? (
            <div>
              <h2 id={props.name + "Or"} className="locationText">
                AND / OR
              </h2>
              <input
                type="text"
                name="itemId"
                value={props.itemId}
                onChange={(e) => {
                  props.setItemId(e.target.value);
                }}
                placeholder="Item ID"
              />
            </div>
          ) : null}
        </div>

        <div id={props.name + "FileManager"} className="fileManager">
          <input type={"file"} id={props.name + `QrCodeFile`} />
          <h2 id={props.name + "Or"} className="locationText">
            OR
          </h2>
          <button
            onClick={() =>
              qrScanningFunc(
                props.containerOption,
                setContainerFunc,
                props.setScannerBool
              )
            }
            type="button"
            id={props.name + "QrScanner"}
          >
            qrScanner
          </button>
        </div>
      </div>
    </div>
  );
}

export default QrRecoveryHomeSection;
