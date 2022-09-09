import React from "react";
import "./infoAll.css";
import machineImg from "../img/tempIsland.jpeg";
import { Machine } from "../models";

interface Props {
  machines: Machine[];
}

export default function infoAll(props: Props) {
  return (
    <div>
      {props.machines.map((machine) => {
        const { Name, idMachine } = machine;

        return (
          <div className="box" key={idMachine}>
            <img src={machineImg} alt="Machine" />
            <p>{`Name: ${Name}  ID: ${idMachine}`}</p>
          </div>
        );
      })}
    </div>
  );
}

// const [machines, setMachines] = useState([]);

// useEffect(()=>{
//   axios.get(`https://localhost:7024/Machine/all`)
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err=>{
//       console.log(err);
//     })
// })
