import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import Transfer from "../Components/Inventory/Inventory_Main/Inventory.Transfer";

function InventoryTransferPage() {
  return (
    <div className="backgroundColor screenHeight">
      <Header />
      <Transfer />
      <Footer />
    </div>
  );
}

export default InventoryTransferPage;
