import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import Inventory from "../Components/Inventory/Inventory";
import Login from "../Components/Account/Login";
import isLoggedIn from "../Functions/isLoggedIn";

import "../Css/Inventory.css";

function InventoryPage() {
  let loggedIn = isLoggedIn();

  return (
    <div className="articleInventory">
      <Header />
      {/* {loggedIn ? <Inventory /> : <Login />} */}
      <Inventory />
      <Footer />
    </div>
  );
}

export default InventoryPage;
