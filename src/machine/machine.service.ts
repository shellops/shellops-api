import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as uuid from 'uuid';

import { MachineApp } from './machine-app.dto';
import { AppTemplate } from '../store/app-template.dto';

@Injectable()
export class MachineService {

  constructor(private readonly databseService: DatabaseService) { }

  async getApps(): Promise<MachineApp[]> {
    return this.databseService.get('apps');
  }

  async getApp(appId: string): Promise<MachineApp> {
    return this.databseService.get(`apps/${appId}`);

  }

  async installApp(template: AppTemplate): Promise<void> {

    const app = new MachineApp(uuid.v4(), template);

    await this.databseService.update(`apps/` + app.id, app);

  }

  async stopApp(appId: string): Promise<void> { }

  async startApp(appId: string): Promise<void> { }

  async restartApp(appId: string): Promise<void> { }

  async uninstallApp(appId: string): Promise<void> { }

  async appLogs(appId: string, skip: number, limit: number): Promise<string[]> {
    return [];
  }

  async uninstallApps(): Promise<void> {

  }

}
