import axios from "axios";
import { saveAs } from "file-saver";
import qrReader from "./qrReader";

async function qrCreationSubmission(
  e,
  scannerBool,
  containerOption,
  containerLocation,
  productId,
  description,
  itemId,
  create
) {
  e.preventDefault();

  const container = document.getElementById(`${containerOption}Container`);
  let imgContainerLocation;
  console.log(container);
  const submitBtn = document.getElementById("submitBtn");
  const selectBtn = document.getElementById("selectBtn");

  container.classList.remove("displayFlex");
  container.classList.add("displayNone");
  submitBtn.classList.add("displayNone");
  selectBtn.classList.add("displayNone");
  if (scannerBool === false && containerOption !== "company") {
    const res = await qrReader(containerOption);
    imgContainerLocation = res;
  }

  let locCheck;

  if (containerOption !== "company") {
    locCheck = await axios.get(
      `/api/LocationCheck/${
        scannerBool ? containerLocation : imgContainerLocation
      }`
    );
  } else {
    locCheck = true;
  }

  if (locCheck.data || locCheck) {
    let body = {};

    if (containerOption === "company") {
      body = { data: `${productId}` };
    } else {
      body = {
        data: `${
          scannerBool ? containerLocation : imgContainerLocation
        }@${productId}`,
      };
    }
    let locCreated = await axios(`/api/LocationCheck/${body.data}`);
    if (
      (locCreated.data === false && create === true) ||
      (locCreated.data === true && create === false)
    ) {
      console.log({ locCreated }, { create });

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
                  <h1>${containerOption}</h1>
                </body>
              </html>`;
              newPage.document.open();
              newPage.document.write(pageHtml);
              newPage.document.close();
            };
            const downLoadFunc = () => {
              saveAs(url, `${body.data}.png`);
            };

            downLoad.onclick = downLoadFunc;
            downLoad.innerHTML = "Download";

            print.innerHTML = "Print";
            print.onclick = printFunc;

            img.src = url;
            img.id = "QrCodeImg";
            form.appendChild(img);
            h1.innerText = body.data;
            h1.classList = "locationText";
            form.appendChild(h1);
            form.appendChild(downLoad);
            form.appendChild(print);
            form.appendChild(redo);
            img.click();
          }
        });
      if (create) {
        let formData = new FormData();
        formData.append("data", body.data);
        formData.append("description", description);
        formData.append("itemId", itemId);
        formData.append("type", containerOption);

        const res = await axios.post("/api/QrCreate", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    } else {
      console.log("failed 2nd " + locCreated + " " + create);
    }
  } else {
    console.log("failed first");
  }
}

export default qrCreationSubmission;
