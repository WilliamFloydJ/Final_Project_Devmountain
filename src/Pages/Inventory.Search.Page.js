import React from "react";
import InventorySearch from "../Components/Inventory/Inventory_Main/Inventory.Search";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";

function InventorySearchPage() {
  return (
    <div className="backgroundColor">
      <Header />
      <InventorySearch />
      <Footer />
    </div>
  );
}

export default InventorySearchPage;
