import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import isLoggedIn from "./Functions/isLoggedIn";
import "./index.css";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import AccountPage from "./Pages/AccountPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import LoginPage from "./Pages/LoginPage";
import Inventory from "./Pages/InventoryPage";
import QRScan from "./Pages/QR.Scan.Page";
import QRRecover from "./Pages/QR.Recover.Page";
import LocationCreationPage from "./Pages/Inventory.LocationCreation.Page";
import InventoryTransferPage from "./Pages/Inventory.Transfer.Page";
import InventorySearchPage from "./Pages/Inventory.Search.Page";
import ItemIdPage from "./Pages/Inventory.ItemId.Page";
import SalesOrderPage from "./Pages/Sales.SalesOrder.Page";
import DeliveryOrderPage from "./Pages/Sales.DeliveryOrder.Page";
import CustomerCreationPage from "./Pages/Sales.CustomerCreation.Page";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    async function isLoggedInFunc() {
      const logged = await isLoggedIn();

      setLoggedIn(logged);
    }
    isLoggedInFunc();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="About" element={<AboutPage />} />
            <Route
              path="Account"
              element={loggedIn ? <AccountPage /> : <LoginPage />}
            />
            <Route path="CreateAccount" element={<CreateAccountPage />} />
          </Route>
          <Route path="/Inventory">
            <Route index element={loggedIn ? <Inventory /> : <LoginPage />} />
            <Route
              path="QRScan"
              element={loggedIn ? <QRScan /> : <LoginPage />}
            />
            <Route
              path="QRRecovery"
              element={loggedIn ? <QRRecover /> : <LoginPage />}
            />
            <Route
              path="InventoryList"
              element={loggedIn ? <InventorySearchPage /> : <LoginPage />}
            />
            <Route
              path="ItemId"
              element={loggedIn ? <ItemIdPage /> : <LoginPage />}
            />
            <Route
              path="LocationCreation"
              element={loggedIn ? <LocationCreationPage /> : <LoginPage />}
            />
            <Route
              path="LocationTransfer"
              element={loggedIn ? <InventoryTransferPage /> : <LoginPage />}
            />
            <Route
              path="CustomerCreation"
              element={loggedIn ? <CustomerCreationPage /> : <LoginPage />}
            />
            <Route
              path="SalesOrder"
              element={loggedIn ? <SalesOrderPage /> : <LoginPage />}
            />
            <Route
              path="DeliveryOrder"
              element={loggedIn ? <DeliveryOrderPage /> : <LoginPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
