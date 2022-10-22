import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import ItemId from "../Components/Inventory/Inventory_Main/Inventory.ItemId";

function ItemIdPage() {
  return (
    <div className="backgroundColor screenHeight">
      <Header />
      <ItemId />
      <Footer />
    </div>
  );
}

export default ItemIdPage;
