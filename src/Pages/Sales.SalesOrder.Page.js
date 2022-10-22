import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import SalesOrder from "../Components/Inventory/Sales/SalesOrder";

function SalesOrderPage() {
  return (
    <div className="backgroundColor">
      <Header />
      <SalesOrder />
      <Footer />
    </div>
  );
}

export default SalesOrderPage;
