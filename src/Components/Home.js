import React from "react";
import isLoggedIn from "../Functions/isLoggedIn";
import "../Css/Home.css";

function Home() {
  return (
    <article>
      <h1>
        SunShine <br /> Inventory Logistics
      </h1>
      <div className="HomeDescription">
        <div>
          <img src="/Images/Clock_Home.png" alt="Sun Clock" id="ClockImg" />
          <h2>
            24/7 <br />
            Customer Service
          </h2>
        </div>
        <div className="transform-left">
          <img
            src="/Images/Rating_Home.png"
            alt="Five Star Rating"
            id="RatingImg"
          />
          <h2>
            Rated Best <br />
            User Experience
          </h2>
        </div>
      </div>
    </article>
  );
}

export default Home;
