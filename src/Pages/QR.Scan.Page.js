import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import QRScanHome from "../Components/Inventory/QR/QR.Scan.Home";

function QRScan() {
  return (
    <div>
      <Header />
      <QRScanHome />
      <Footer />
    </div>
  );
}

export default QRScan;
