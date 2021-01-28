import { AppTemplate } from '../store/app-template.dto';
import { MachineApp } from './machine-app.dto';
import { MachineService } from './machine.service';

export class Machine {
  constructor(
    machineService: MachineService,
    options: {
      label: string;
      apps: MachineApp[];
    },
  ) { }



}
