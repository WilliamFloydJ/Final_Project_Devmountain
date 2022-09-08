import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Inventory from "../Components/Inventory";

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
