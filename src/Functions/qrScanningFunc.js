import QrScanner from "qr-scanner";
import ScannerOutline from "../Images/ScannerOutline.svg";

function qrScanningFunc(containerOption, setContainerLocation, setScannerBool) {
  const qrCodeFile = document.getElementById(`${containerOption}QrCodeFile`);
  const orH2 = document.getElementById(`${containerOption}Or`);
  const qrScanBtn = document.getElementById(`${containerOption}QrScanner`);

  qrCodeFile.classList.add("displayNone");
  orH2.classList.add("displayNone");
  qrScanBtn.classList.add("displayNone");

  const video = document.createElement("video");
  video.setAttribute("playsinline", "");
  video.setAttribute("autoplay", "");
  video.style.width = "300px";
  video.style.height = "200px";

  const manager = document.getElementById(`${containerOption}FileManager`);
  const videoContainer = document.createElement("div");
  videoContainer.className = "videoContainer";

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
      highlightCodeOutline: true,
      returnDetailedScanResult: true,
    }
  );
  const redo = document.createElement("input");
  redo.type = "button";
  redo.value = "Back";
  const redoFunc = (e) => {
    qrScanBtn.classList.remove("displayNone");
    qrCodeFile.classList.remove("displayNone");
    orH2.classList.remove("displayNone");
    redo.classList.add("displayNone");
    videoContainer.classList.add("displayNone");
    qRScanner.stop();
    setScannerBool(false);
    e.preventDefault();
  };
  redo.onclick = redoFunc;
  manager.appendChild(redo);

  const scanRegion = document.createElement("img");
  scanRegion.src = ScannerOutline;
  scanRegion.classList = "scanOutline";
  videoContainer.appendChild(scanRegion);

  qRScanner.start();
  setScannerBool(true);
}

export default qrScanningFunc;
