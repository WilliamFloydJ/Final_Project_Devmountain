import axios from "axios";
import React, { useState } from "react";
import qrScanningFunc from "../../../Functions/qrScanningFunc";
import qrReader from "../../../Functions/qrReader";
import "../../../Css/QR.css";

function QRScanHome() {
  const [containerLocation, setContainerLocation] = useState("");
  const [scannerBool, setScannerBool] = useState(false);

  function qrScanSubmission(e) {
    e.preventDefault();
    scannerBool
      ? (window.location = containerLocation)
      : qrReader("", setContainerLocation);
  }

  return (
    <form onSubmit={qrScanSubmission} className="ScanHome column">
      <h1 className="text">QR Scanner</h1>
      <div className="row width">
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
            onClick={() =>
              qrScanningFunc("", setContainerLocation, setScannerBool)
            }
            id="QrScanner"
            type="button"
          >
            qrScanner
          </button>
        </div>

        <input type="submit" value="Read QR code" />
      </div>
    </form>
  );
}

export default QRScanHome;
