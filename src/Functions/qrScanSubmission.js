import qrReader from "./qrReader";

function qrScanSubmission(
  e,
  scannerBool,
  containerLocation,
  setContainerLocation,
  containerOption
) {
  e.preventDefault();
  if (scannerBool === false) {
    qrReader(containerOption, setContainerLocation);
  } else {
    window.location = containerLocation;
  }
}

export default qrScanSubmission;
