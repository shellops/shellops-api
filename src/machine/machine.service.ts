import { Injectable } from '@nestjs/common';
import { Machine } from './machine';

@Injectable()
export class MachineService {
  async createMachine(credentials): Machine {}

  async getMachineById(machineId: string): Promise<Machine> {}

  async getMachines(): Promise<Machine[]> {}

  async deleteAllMachines(): Promise<void> {}

  async deleteMachine(machineId: string): Promise<void> {}
}
