import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import CustomerCreation from "../Components/Inventory/Sales/CustomerCreation";

function CustomerCreationPage() {
  return (
    <div className="backgroundColor">
      <Header />
      <CustomerCreation />
      <Footer />
    </div>
  );
}

export default CustomerCreationPage;
