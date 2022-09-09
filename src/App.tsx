import React, { useEffect, useState } from "react";
import "./App.css";
import InfoAll from "./components/infoAll";
import { MachineDTO, Machine } from "./models";
import axios from "axios";

const list: MachineDTO[] = [
  {
    name: "Machine 1",
    id: 1,
  },
  {
    name: "Machine 2",
    id: 2,
  },
  {
    name: "Machine 3",
    id: 3,
  },
  {
    name: "Machine 4",
    id: 4,
  },
];

export default function App() {
  const [machines, setMachines] = useState<Machine[]>([]);

  const getMachines = async () => {
    //https://localhost:7024/Machine/all
    //Object Destructuring
    const { data } = await axios.get("https://localhost:7024/Machine/all");
    console.log(data);
    setMachines(data);
  };

  useEffect(() => {
    getMachines();
  }, []);

  return (
    <div className="container">
      <nav>Navbar</nav>
      <div id="names">
        <p>Machines</p>
        <p>Time</p>
      </div>

      <div id="info">
        <InfoAll machines={machines} />
      </div>
    </div>
  );
}
