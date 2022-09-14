import React, { useEffect, useState } from "react";
import "./infoAll.css";
import { MachineDTO, TimeDTO } from "../models";
import axios from "axios";
import InfoItem from "./infoItem";

interface Props {
  machines: MachineDTO[];
  beginDay: string;
  endDay: string;
}

export default function InfoAll(props: Props) {
  // useEffect(() => {
  //   console.log("Date passed");
  // }, [props.beginDay, props.endDay]);

  return (
    <div>
      {props.machines.map((machine) => {
        return (
          <InfoItem
            machine={machine}
            start={props.beginDay}
            end={props.endDay}
            key={machine.idMachine}
          />
        );
      })}
    </div>
  );
}
