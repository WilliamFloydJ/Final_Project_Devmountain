import React, { useEffect, useState } from "react";

import QrScanner from "qr-scanner";
import axios from "axios";
import { saveAs } from "file-saver";

import "../../../Css/QR.css";

function QRCreateHome() {
  const [containerOption, setContainerOption] = useState("product");
  const [containerLocation, setContainerLocation] = useState("");
  const [productId, setProductId] = useState("");
  let scannerBool = null;

  useEffect(() => {
    const container = document.getElementById("Container");
    const containerChildren = Array.from(container.children);

    console.log(containerOption);

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

  function qrScanner(e) {
    const qrCodeFile = document.getElementById(`${containerOption}QrCodeFile`);
    const orH2 = document.getElementById(`${containerOption}Or`);
    const qrScanBtn = document.getElementById(`${containerOption}QrScanner`);

    qrScanBtn.classList.add("displayNone");
    qrCodeFile.classList.add("displayNone");
    orH2.classList.add("displayNone");

    e.preventDefault();
    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.style.width = "300px";
    video.style.height = "200px";

    const manager = document.getElementById(`${containerOption}FileManager`);

    const videoContainer = document.createElement("div");

    videoContainer.appendChild(video);
    manager.appendChild(videoContainer);

    const qRScanner = new QrScanner(
      video,
      (res) => {
        if (document.getElementById("locationData") === null) {
          const locationData = document.createElement("h2");
          locationData.id = "locationData";
          locationData.textContent = res.data;
          manager.prepend(locationData);
        } else {
          const locationData = document.getElementById("locationData");
          locationData.textContent = res.data;
        }
        console.log(res.data);
        setContainerLocation(res.data);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      }
    );

    const redo = document.createElement("input");
    redo.type = "button";
    redo.value = "Back";
    const redoFunc = () => {
      qrScanBtn.classList.remove("displayNone");
      qrCodeFile.classList.remove("displayNone");
      orH2.classList.remove("displayNone");
      redo.classList.add("displayNone");
      videoContainer.classList.add("displayNone");
      qRScanner.stop();
      e.preventDefault();
    };
    redo.onclick = redoFunc;
    manager.appendChild(redo);

    const scanRegion = document.getElementsByClassName("scan-region-highlight");
    videoContainer.appendChild(scanRegion[0]);

    qRScanner.start();
    scannerBool = true;
  }
  function qrReader() {
    const formData = new FormData();
    const qrCodeFile = document.getElementById(`${containerOption}QrCodeFile`);
    formData.append("file", qrCodeFile.files.file);
    formData.append("type", axios);

    axios
      .post("/api/QrRead", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setContainerLocation(res.data);
      });
  }

  function submissionHandle(e) {
    if (scannerBool === false) {
      qrReader();
    }

    const container = document.getElementById(`${containerOption}Container`);
    console.log(container);
    const submitBtn = document.getElementById("submitBtn");
    const selectBtn = document.getElementById("selectBtn");

    container.classList.remove("displayFlex");
    container.classList.add("displayNone");
    submitBtn.classList.add("displayNone");
    selectBtn.classList.add("displayNone");

    let body = {};

    if (containerOption === "company") {
      body = { data: `/Inventory/${productId}` };
    } else {
      body = { data: `/Inventory/${containerLocation}/${productId}` };
    }

    axios
      .get(
        `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${body.data}`,
        { responseType: "blob" }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        if (document.getElementById("QrCodeImg") === null) {
          const form = document.getElementById("QRForm");
          const img = document.createElement("img");
          const downLoad = document.createElement("button");
          const print = document.createElement("button");
          const redo = document.createElement("button");

          const redoFunc = () => {
            window.location.reload();
          };
          redo.onclick = redoFunc;
          redo.innerText = "Create Another QR Code";

          const printFunc = () => {
            const newPage = window.open("about:blank", "_new");
            const pageHtml = `<html>
                <head>
                  <title>Print Page</title>
                  <script>
                    function step1(){
                      setTimeout('step2()', 10);
                    }
                    function step2(){
                      window.print();
                      window.close()
                    }
                  </script>
                </head>
                <body onload='step1()'>
                  <img src='${url}'/>
                  <h1>${containerOption}</h1>
                </body>
              </html>`;
            newPage.document.open();
            newPage.document.write(pageHtml);
            newPage.document.close();
          };
          const downLoadFunc = () => {
            saveAs(url, "QRCode.png");
          };

          downLoad.onclick = downLoadFunc;
          downLoad.innerHTML = "Download";

          print.innerHTML = "Print";
          print.onclick = printFunc;

          img.src = url;
          img.id = "QrCodeImg";
          form.appendChild(img);
          form.appendChild(downLoad);
          form.appendChild(print);
          form.appendChild(redo);
          img.click();
        }
      });
    axios.post("/api/QrCreation", body).then((res) => {});
    e.preventDefault();
  }

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
    <form id="QRForm" className="ScanHome" onSubmit={submissionHandle}>
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
        <div id="product" className="displayNone">
          <div id="productContainer" className="displayFlex">
            <input
              type={"text"}
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
              placeholder="Product ID"
              className=""
            />
            <div id="productFileManager" className="fileManager">
              <input type={"file"} id={"productQrCodeFile"} />
              <h2 id="productOr">OR</h2>
              <button onClick={qrScanner} id="productQrScanner">
                qrScanner
              </button>
            </div>
          </div>
        </div>
        <div id="box" className="displayNone"></div>
        <div id="location" className="displayNone"></div>
        <div id="warehouse" className="displayNone"></div>
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

      <input type={"submit"} value={"Create QR Code"} id="submitBtn" />
    </form>
  );
}

export default QRCreateHome;
