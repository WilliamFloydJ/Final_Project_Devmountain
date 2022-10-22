import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import DeliveryOrder from "../Components/Inventory/Sales/DeliveryOrder";

function DeliveryOrderPage() {
  return (
    <div className="backgroundColor">
      <Header />
      <DeliveryOrder />
      <Footer />
    </div>
  );
}

export default DeliveryOrderPage;
