import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as uuid from 'uuid';

import { MachineApp } from './machine-app.dto';
import { AppTemplate } from '../store/app-template.dto';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class MachineService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly dockerService: DockerService,
  ) { }

  private async getContainerName(appId: string) {
    const app = await this.getApp(appId);
    return app?.container;
  }

  async getApps(): Promise<MachineApp[]> {
    const apps = await this.databaseService.get<MachineApp[]>('apps');
    return Object.values(apps || {});
  }

  async getApp(appId: string): Promise<MachineApp> {
    return this.databaseService.get(`apps/${appId}`);
  }

  async installApp(template: AppTemplate): Promise<string> {

    const images = await this.dockerService.images();

    if (!images.find(p => p.RepoTags.includes(template.image)))
      await this.dockerService.pullImage(template.image);

    const app = new MachineApp(uuid.v4(), template);
    await this.databaseService.update(`apps/` + app.id, app);
    await this.dockerService.createContainer(app);
    await this.dockerService.startContainer(app.container);
    return app.id;
  }

  async stopApp(appId: string): Promise<void> {
    const container = await this.getContainerName(appId);
    await this.dockerService.stopContainer(container);
  }

  async startApp(appId: string): Promise<void> {
    const container = await this.getContainerName(appId);
    await this.dockerService.startContainer(container);
  }

  async restartApp(appId: string): Promise<void> {
    const container = await this.getContainerName(appId);
    await this.dockerService.startContainer(container);
  }

  async uninstallApp(appId: string): Promise<void> {
    const container = await this.getContainerName(appId);
    await this.dockerService.stopContainer(container);
    await this.dockerService.removeContainer(container);
    await this.databaseService.remove(`apps/${appId}`);
  }

  async appLogs(appId: string, skip: number, limit: number): Promise<string[]> {
    return [];
  }

  async uninstallApps(): Promise<void> {
    const appIds = Object.keys(await this.databaseService.get('apps'));

    for (const appId of appIds) {
      await this.uninstallApp(appId);
    }
  }
}
