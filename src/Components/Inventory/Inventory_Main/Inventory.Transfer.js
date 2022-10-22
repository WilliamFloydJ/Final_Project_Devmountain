import axios from "axios";
import React, { useEffect, useState } from "react";
import qrScanningFunc from "../../../Functions/qrScanningFunc.js";
import qrReader from "../../../Functions/qrReader.js";
import { saveAs } from "file-saver";

function Transfer() {
  const [scannerBool1, setScannerBool1] = useState(false);
  const [scannerBool2, setScannerBool2] = useState(false);

  const [locationFrom, setLocationFrom] = useState("");
  const [locationTo, setLocationTo] = useState("");

  async function transferSub(e) {
    e.preventDefault();
    let to = locationTo;
    let from = locationFrom;

    if (scannerBool1 === false) {
      const res = await qrReader(1);
      from = res;
    }
    if (scannerBool2 === false) {
      const res = await qrReader(2);
      to = res;
    }
    console.log(from);
    console.log(to);

    const fromType = await axios.put(`/api/Transfer/${from}/${to}`);

    const fromLoc = from.split("@")[from.split("@").length - 1];

    axios
      .get(
        `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${
          to + "@" + fromLoc
        }`,
        { responseType: "blob" }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        if (document.getElementById("QrCodeImg") === null) {
          const form = document.getElementById("Transfer");
          form.className = "row ScanHome";

          for (let node of form.children) {
            node.classList.add("displayNone");
          }

          const img = document.createElement("img");
          const downLoad = document.createElement("button");
          downLoad.type = "button";
          const print = document.createElement("button");
          print.type = "button";
          const redo = document.createElement("button");
          redo.type = "button";
          const h1 = document.createElement("h1");

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
                  <h1>${fromType.data}</h1>
                </body>
              </html>`;
            newPage.document.open();
            newPage.document.write(pageHtml);
            newPage.document.close();
          };
          const downLoadFunc = () => {
            saveAs(url, `${to + "@" + fromLoc}.png`);
          };

          downLoad.onclick = downLoadFunc;
          downLoad.innerHTML = "Download";

          print.innerHTML = "Print";
          print.onclick = printFunc;

          img.src = url;
          img.id = "QrCodeImg";
          form.appendChild(img);
          h1.innerText = to + "@" + fromLoc;
          h1.classList = "locationText";
          form.appendChild(h1);
          form.appendChild(downLoad);
          form.appendChild(print);
          form.appendChild(redo);
          img.click();
        }
      });
  }

  return (
    <form className="ScanHome column" id="Transfer" onSubmit={transferSub}>
      <h1 className="text">Inventory Transfer</h1>
      <div className="row">
        <div id="1FileManager" className="fileManager groupColor">
          <label htmlFor="fFile">Transferring Location</label>

          <input
            id="1QrCodeFile"
            name="fFile"
            type="file"
            onChange={() => {
              setScannerBool1(false);
            }}
            accept={".png, .gif, .jpeg, .jpg"}
          />
          <h2 id="1Or">OR</h2>
          <button
            onClick={() =>
              qrScanningFunc("1", setLocationFrom, setScannerBool1)
            }
            id="1QrScanner"
            type="button"
          >
            qrScanner
          </button>
        </div>

        <div id="2FileManager" className="fileManager groupColor">
          <label htmlFor="tFile">Transfer To</label>
          <input
            id="2QrCodeFile"
            name="tFile"
            type="file"
            onChange={() => {
              setScannerBool2(false);
            }}
            accept={".png, .gif, .jpeg, .jpg"}
          />
          <h2 id="2Or">OR</h2>
          <button
            onClick={() => qrScanningFunc("2", setLocationTo, setScannerBool2)}
            id="2QrScanner"
            type="button"
          >
            qrScanner
          </button>
        </div>
      </div>

      <input
        type="submit"
        className="space-outTopHeavy"
        value="Transfer Location"
      />
    </form>
  );
}

export default Transfer;
