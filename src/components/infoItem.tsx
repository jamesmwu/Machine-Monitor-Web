import React, { useEffect, useState, useMemo } from "react";
import "./infoItem.css";
import machineImg from "../img/tempIsland.jpeg";
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

interface visTimeOptions {
  start: string;
  end: string;
  min: string;
  max: string;
}

export interface visTimeData extends Array<visTimeItem> {}

export default function InfoItem(props: Props) {
  const groups = [
    {
      id: 0,
      content: "Stack Light",
    },
  ];

  //useMemo to set options
  // const [options, setOptions] = useState<visTimeOptions>();

  // const items = [
  //   {
  //     id: 0,
  //     group: 0,
  //     start: "2022-09-12T08:00:00",
  //     end: "2022-09-12T09:00:00",
  //     content: "",
  //     className: "red",
  //   },
  //   {
  //     id: 1,
  //     group: 0,
  //     start: "2022-09-12T09:00:00",
  //     end: "2022-09-12T10:00:00",
  //     content: "",
  //     className: "green",
  //   },
  // ];
  //DATA END
  const { Name, idMachine, IP } = props.machine;
  const [times, setTimes] = useState<TimeDTO[]>([]);
  const [items, setItems] = useState<visTimeData>([]);
  const [options, setOptions] = useState<TimelineOptions>({
    start: "9/12/2022 00:00:00",
    end: "9/12/2022 24:00:00",
    min: "9/12/2022 00:00:00",
    max: "9/12/2022 24:00:00",
    editable: false,
    moveable: true,
    stack: false,
    selectable: false,
    showMajorLabels: true,
    showMinorLabels: true,
    orientation: "top",
  });
  var idx = 0;

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
    // times.forEach(element => {
    //   const temp : visTimeItem {
    //     id: idx,

    //   }
    // })
  };

  useEffect(() => {
    getTimes();
    let temp: visTimeOptions = {
      start: props.start,
      end: props.end,
      min: props.start,
      max: props.end,
    };
    setOptions(temp);
  }, [times, props.start, props.end]);

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
