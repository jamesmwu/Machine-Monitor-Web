import React, { useEffect, useState, useMemo } from "react";
import "./infoItem.css";
import TMC10 from "../img/TMC10.jpeg";
import VMC2 from "../img/VMC2.jpeg";
import VMC10 from "../img/VMC10.jpeg";
import XYZ1632 from "../img/XYZ1632.jpeg";
import island from "../img/tempIsland.jpeg";
import { MachineDTO, TimeDTO } from "../models";
import axios from "axios";
import LightTimeline from "./lightTimeline";
import { TimelineOptions } from "vis-timeline";

interface Props {
  machine: MachineDTO;
  start: string;
  end: string;
}

interface visTimeItem {
  id: number;
  group: number;
  start: string;
  end: string;
  content: "";
  className: string;
}

export interface visTimeData extends Array<visTimeItem> {}

export default function InfoItem(props: Props) {
  const groups = [
    {
      id: 0,
      content: "Stack Light",
    },
  ];

  const { Name, idMachine, IP } = props.machine;
  const [times, setTimes] = useState<TimeDTO[]>([]);
  const [items, setItems] = useState<visTimeData>([]);
  const [machineImg, setMachineImg] = useState(TMC10);

  const [options, setOptions] = useState<TimelineOptions>({
    start: "2022-07-15 00:00:00",
    end: "2022-07-15 24:00:00",
    min: "2022-07-15 00:00:00",
    max: "2022-07-15 24:00:00",
    editable: false,
    moveable: true,
    stack: false,
    selectable: false,
    showMajorLabels: true,
    showMinorLabels: true,
    orientation: "top",
  });

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
    // console.log(cmd);

    const { data } = await axios.get(cmd);
    //TODO: data.catch() error for invalid date entered

    setTimes(data); //Sets all times for the current machine
    let tempItemArray: visTimeData = [];
    let temp: visTimeItem;

    for (let i = 0; i < times.length - 1; i++) {
      temp = {
        id: i,
        group: 0,
        start: times[i].Time,
        end: times[i + 1].Time,
        content: "",
        className: times[i].StackLight.toLowerCase(),
      };

      if (times.length > 0) tempItemArray.push(temp);
    }

    setItems(tempItemArray);
  };

  useEffect(() => {
    getTimes();
    let temp: TimelineOptions = {
      start: props.start,
      end: props.end,
      min: props.start,
      max: props.end,
      editable: false,
      moveable: true,
      stack: false,
      selectable: false,
      showMajorLabels: true,
      showMinorLabels: true,
      orientation: "top",
    };
    setOptions(temp);
  }, [times, props.start, props.end]);

  useEffect(() => {
    switch (props.machine.idMachine) {
      case 7:
        setMachineImg(TMC10);
        break;
      case 8:
      case 13:
        setMachineImg(VMC2);
        break;
      case 10:
      case 12:
        setMachineImg(VMC10);
        break;
      case 9:
        setMachineImg(XYZ1632);
        break;
      default:
        setMachineImg(island);
    }
  }, []);

  return (
    <div className="box" key={idMachine}>
      <div id="machineInfo">
        <p>{`Name: ${Name}  ID: ${idMachine}`}</p>
        <img src={machineImg} alt="Machine" />
        <p>{`IP: ${IP}`}</p>
      </div>
      <div style={{ textAlign: "left" }}>
        <LightTimeline groups={groups} options={options} items={items} />
      </div>
    </div>
  );
}
