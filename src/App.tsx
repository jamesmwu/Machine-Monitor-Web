import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import InfoAll from "./components/infoAll";
import { MachineDTO } from "./models";
import axios from "axios";

export default function App() {
  const [machines, setMachines] = useState<MachineDTO[]>([]);
  const [beginDate, setBeginDate] = useState("2022-07-15");
  const [endDate, setEndDate] = useState("2022-07-16");

  const beginDateInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const endDateInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const getMachines = async () => {
    //Object Destructuring
    const { data } = await axios.get("https://localhost:7024/Machine/all");
    setMachines(data);
  };

  useEffect(() => {
    getMachines();
  }, [beginDate, endDate]);

  function handleClick() {
    setBeginDate(beginDateInputRef.current.value);
    setEndDate(endDateInputRef.current.value);
    console.log(beginDateInputRef.current.value);
    console.log(endDateInputRef.current.value);
  }

  return (
    <div className="container">
      <nav>
        <label>Enter Date: </label>
        <input
          ref={beginDateInputRef}
          type="text"
          placeholder="YYYY-MM-DD TT:TT:TT"
          style={{ width: 153 }}
        />
        <input
          ref={endDateInputRef}
          type="text"
          placeholder="YYYY-MM-DD TT:TT:TT"
          style={{ width: 153 }}
        />
        <button onClick={handleClick}>Submit</button>
      </nav>
      <div id="names">
        <p>Machines</p>
        <p>Time</p>
      </div>

      <div id="info">
        <InfoAll machines={machines} beginDay={beginDate} endDay={endDate} />
      </div>
    </div>
  );
}
