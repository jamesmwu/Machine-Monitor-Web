import React from "react";
import "./App.css";
import InfoAll from "./components/infoAll";

function App() {
  return (
    <div className="container">
      <nav>Navbar</nav>
      <div id="names">
        <p>Machines</p>
        <p>Time</p>
      </div>
      <div id="info">
        <InfoAll />
      </div>

      {/* <div id="sidebar">Sidebar</div>
      <div id="content1">Content1</div>
      <div id="content2">Content2</div>
      <div id="content3">Content3</div>
      <footer>Footer</footer> */}
    </div>
  );
}

export default App;
