export interface MachineDTO {
  idMachine: number;
  Name: string;
  IP: string;
}

export interface TimeDTO {
  idTime: number;
  StackLight: string;
  idMachine: number;
  Time: string;
}

// export interface TimelineDTO {
//   items: vistimeline.DataItemCollectionType,
//   groups: vistimeline.DataGroupCollectionType,
//   options?: vistimeline.TimelineOptions,
// }
