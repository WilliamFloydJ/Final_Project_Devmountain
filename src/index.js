import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import AccountPage from "./Pages/AccountPage";
import Inventory from "./Pages/InventoryPage";
import QRScan from "./Pages/QR.Scan.Page";
import QRCreate from "./Pages/QR.Create.Page";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="About" element={<AboutPage />} />
        <Route path="Account" element={<AccountPage />} />
      </Route>
      <Route path="/Inventory">
        <Route index element={<Inventory />} />
        <Route path="QRScan" element={<QRScan />} />
        <Route path="QRCreation" element={<QRCreate />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
