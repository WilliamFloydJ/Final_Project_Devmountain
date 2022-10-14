import axios from "axios";

async function qrReader(containerOption) {
  const formData = new FormData();
  const qrCodeFile = document.getElementById(`${containerOption}QrCodeFile`);
  console.log(qrCodeFile.files[0]);
  formData.append("file", qrCodeFile.files[0]);
  formData.append("type", axios);
  const res = await axios.post("/api/QrRead", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(res.data);

  return res.data;
}

export default qrReader;
