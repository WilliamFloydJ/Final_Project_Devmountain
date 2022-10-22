import React from "react";
import "../../Css/Header.css";

function Header() {
  document.documentElement.dataset.scroll = window.scrollY;
  document.addEventListener("scroll", () => {
    document.documentElement.dataset.scroll = window.scrollY;
  });

  return (
    <header>
      <ul>
        <a href="/">
          <img src="/Icon.png" alt="SunShine Inventory Logistics Logo" />
        </a>
        <nav>
          <ul>
            <a href="/About">About</a>
            <a href="/Inventory">Inventory</a>
            <a href="/Account">Account</a>
          </ul>
        </nav>
      </ul>
    </header>
  );
}

export default Header;
