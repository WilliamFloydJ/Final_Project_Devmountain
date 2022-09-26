import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import Inventory from "../Components/Inventory/Inventory";

import "../Css/Inventory.css";

function InventoryPage() {
  return (
    <div className="articleInventory">
      <Header />
      <Inventory />
      <Footer />
    </div>
  );
}

export default InventoryPage;
