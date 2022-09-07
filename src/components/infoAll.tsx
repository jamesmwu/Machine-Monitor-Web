import React from "react";
import "./infoAll.css";
import machine from "../img/tempIsland.jpeg";

function infoAll() {
  return (
    <div className="box">
      <img src={machine} alt="Machine" />
      {/* <div id="block"></div> */}
      <p>Timeline for machine</p>
    </div>
  );
}

export default infoAll;
