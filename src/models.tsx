export interface MachineDTO {
  name: string;
  id: number;
}

export interface Machine {
  idMachine: number;
  Name: string;
  IP: string;
}

export interface Time {
  idTime: number;
  StackLight: string;
  idMachine: number;
  Time: string;
}
