import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import QRCreateHome from "../Components/Inventory/QR/QR.Create.Home";

function QRCreate() {
  return (
    <div>
      <Header />
      <QRCreateHome />
      <Footer />
    </div>
  );
}

export default QRCreate;
