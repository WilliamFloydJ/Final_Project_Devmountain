import axios from "axios";
import React, { useState } from "react";
import QrScanner from "qr-scanner";
import "../Css/QR.css";

function QRScanHome() {
  let scannerBool = null;
  function qrScanner(e) {
    const qrCodeFile = document.getElementById("QrCodeFile");
    const backButton = document.createElement("button");
    const orH2 = document.getElementById("or");

    orH2.classList.add("displayNone");
    qrCodeFile.classList.add("displayNone");

    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.style.width = "300px";
    video.style.height = "200px";

    const manager = document.getElementById("fileManager");

    backButton.click = () => {
      window.location.reload();
    };

    manager.appendChild(video);
    manager.appendChild(backButton);

    const qRScanner = new QrScanner(video, (res) =>
      console.log("decoded qr code:", res)
    );

    qRScanner.start();
    scannerBool = true;
    e.preventDefault();
  }

  function submissionHandle(e) {
    if (scannerBool === true) {
    }
    if (scannerBool === false) {
      const formData = new FormData();
      const qrCodeFile = document.getElementById("QrCodeFile");
      formData.append("file", qrCodeFile);
      formData.append("type", axios);

      axios
        .post("/api/QrRead", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
        });
    }

    e.preventDefault();
  }
  return (
    <form onSubmit={submissionHandle} className="ScanHome">
      <div id="fileManager">
        <button onClick={qrScanner}>qrScanner</button>
        <h2>OR</h2>
        <input
          id="QrCodeFile"
          name="file"
          type="file"
          onChange={() => {
            scannerBool = false;
          }}
          accept={".png, .gif, .jpeg, .jpg"}
        />
      </div>

      <input type="submit" value="Read QR code" />
    </form>
  );
}

export default QRScanHome;
