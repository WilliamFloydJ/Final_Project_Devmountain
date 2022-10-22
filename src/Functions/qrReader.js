import axios from "axios";

async function qrReader(containerOption) {
  const formData = new FormData();
  const qrCodeFile = document.getElementById(`${containerOption}QrCodeFile`);
  formData.append("file", qrCodeFile.files[0]);
  formData.append("type", axios);
  const res = await axios.post("/api/QrRead", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export default qrReader;
