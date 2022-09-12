import React, { useEffect, useState } from "react";
import "./infoAll.css";
import machineImg from "../img/tempIsland.jpeg";
import { MachineDTO, TimeDTO } from "../models";
import axios from "axios";
import LightTimeline from "./lightTimeline";
import { TimelineOptions } from "vis-timeline";
import moment from "moment";

interface Props {
  machine: MachineDTO;
  start: string;
  end: string;
}

export default function InfoItem(props: Props) {
  //DATA
  const [startEnd] = React.useState([
    moment().subtract(1, "d").toDate(),
    moment().toDate(),
  ]);

  const options: TimelineOptions = {
    start: "2022-07-15",
    end: "2022-07-16",
    min: "2022-07-15",
    max: "2022-07-16",
    // verticalScroll: true,
    // horizontalScroll: true,
    // zoomKey: "ctrlKey",
    // orientation: "both",
    // zoomMin: 1000 * 60 * 60 * 240,
  };

  const groups = [
    {
      id: 1,
      content: "Stack Light",
    },
  ];

  const items = [
    {
      id: 11,
      group: 1,
      start: startEnd[0],
      end: startEnd[1],
      content: "Hello",
      className: "tl-item",
    },
    {
      id: 22,
      group: 2,
      start: startEnd[0],
      end: startEnd[1],
      content: "Nested Hello",
      className: "tl-item",
    },
  ];
  //DATA END

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
    // console.log(cmd);

    const { data } = await axios.get(cmd);
    // data.catch(() => {
    //   console.log("Error detected");
    // });

    // data.catch(function (error) {
    //   if (error.response) {
    //     // Request made and server responded
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }

    // });

    setTimes(data);

    let text = "";

    for (let i = 0; i < times.length; i++) {
      text += times[i].StackLight + " ";
    }
    setLight(text);
  };

  useEffect(() => {
    getTimes();
  }, [times, props.start, props.end]);

  return (
    <div className="box" key={idMachine}>
      <div id="machineInfo">
        <p>{`Name: ${Name}  ID: ${idMachine}`}</p>
        <img src={machineImg} alt="Machine" />
        <p>{`IP: ${IP}`}</p>
      </div>

      {/* <p>{light}</p> */}
      <LightTimeline groups={groups} options={options} items={items} />
    </div>
  );
}
