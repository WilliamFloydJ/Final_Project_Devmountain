import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import QRRecoverHome from "../Components/Inventory/QR/QR.Recovery.Home";

function QRRecover() {
  return (
    <div className="backgroundColor screenHeight">
      <Header />
      <QRRecoverHome />
      <Footer />
    </div>
  );
}

export default QRRecover;
