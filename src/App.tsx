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
    // console.log(inputRef.current.value);
  }

  return (
    <div className="container">
      <nav>
        <label>Enter Date: </label>
        <input ref={beginDateInputRef} type="text" defaultValue="2022-07-15" />
        <input ref={endDateInputRef} type="text" defaultValue="2022-07-16" />
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
