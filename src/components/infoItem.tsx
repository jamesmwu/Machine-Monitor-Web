import React, { useEffect, useState } from "react";
import "./infoAll.css";
import machineImg from "../img/tempIsland.jpeg";
import { MachineDTO, TimeDTO } from "../models";
import axios from "axios";

interface Props {
  machine: MachineDTO;
  start: string;
  end: string;
}

export default function InfoItem(props: Props) {
  const { Name, idMachine, IP } = props.machine;
  const [times, setTimes] = useState<TimeDTO[]>([]);
  const [light, setLight] = useState("");

  const getTimes = async () => {
    // 2022-07-15
    // 2022-07-16
    let cmd =
      "https://localhost:7024/Time/Date-Machine?begin=" +
      props.start +
      "&end=" +
      props.end +
      "&machineId=" +
      props.machine.idMachine +
      "&limit=100";
    const { data } = await axios.get(cmd);
    setTimes(data);

    let text = "";

    for (let i = 0; i < times.length; i++) {
      text += times[i].StackLight + " ";
    }
    setLight(text);
  };

  useEffect(() => {
    getTimes();
  }, [times]);

  return (
    <div className="box" key={idMachine}>
      <div id="machineInfo">
        <p>{`Name: ${Name}  ID: ${idMachine}`}</p>
        <img src={machineImg} alt="Machine" />
        <p>{`IP: ${IP}`}</p>
      </div>

      <p>{light}</p>
    </div>
  );
}
