import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import LocationCreation from "../Components/Inventory/Inventory_Main/Inventory.LocationCreation";

function LocationCreationPage() {
  return (
    <div className="backgroundColor screenHeight">
      <Header />
      <LocationCreation />
      <Footer />
    </div>
  );
}

export default LocationCreationPage;
