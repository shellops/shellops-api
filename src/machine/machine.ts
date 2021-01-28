import { AppTemplate } from '../store/app-template.dto';
import { MachineApp } from './machine-app';
import { MachineService } from './machine.service';

export class Machine {
  constructor(
    machineService: MachineService,
    options: {
      label: string;
      apps: MachineApp[];
    },
  ) {}

  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {}

  async setupAgent(): Promise<void> {}

  async getApps(): Promise<MachineApp> {}

  async getApp(appId: string): Promise<MachineApp> {}

  async installApp(app: AppTemplate): Promise<MachineApp> {}

  async stopApp(appId: string): Promise<void> {}

  async startApp(appId: string): Promise<void> {}

  async restartApp(appId: string): Promise<void> {}

  async uninstallApp(appId: string): Promise<void> {}

  appLogs(skip: number, limit: number): Promise<string[]>;

  uninstallApps(): Promise<void>;

  logs(skip: number, limit: number): Promise<string[]>;
}
