import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Modem from 'docker-modem';

import { Config } from '../config';
import { MachineApp } from '../machine/machine-app.dto';
import { ShellService } from '../shell/shell.service';

@Injectable()
export class DockerService extends ShellService implements OnModuleInit {

  modem = new Modem({ socketPath: Config.dockerSocket });

  async onModuleInit() {

  }


  createContainer(app: Partial<MachineApp>): Promise<{ containerId: string }> {

    const call = {
      path: '/containers/create?',
      method: 'POST',
      options: {
        Image: app.image,
        name: 'app2',
      } as Docker.Config & { name: string },
      statusCodes: {
        200: true,
        201: true,
        400: 'bad request',
        404: 'no such image',
        406: 'impossible to attach',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err)

        resolve(data)
      })
    })

  }


  private appToContainer(app: MachineApp): Partial<Docker.Config> & { name: string } {

    const name = `${app.name.toLowerCase().replace(/\s/g, '-')}_${app.id}`;

    const opts = [
      '--detach',
      `--name ${name}`,
      `--restart always`,
      `-v /etc/localtime:/etc/localtime`,
      `-l traefik.backend=${name}`,
      `-l traefik.docker.network=bridge`,
      `-l traefik.frontend.entryPoints=http,https`,
      `-l traefik.enable=true`,
      `-l traefik.port=${app.webPort || 80}`,
    ];

    app.domains?.length && opts.push(`-l traefik.frontend.rule=Host:${app.domains.join(',')}`);

    app.ports?.forEach(item => opts.push(`-p ${item.host}:${item.container}`));
    app.variables?.forEach(item => opts.push(`--env ${item.name} ${item.name}`));
    app.mounts?.forEach(item => opts.push(`--volume ${item.host}:${item.container}`));

    return {
      name: name,
      Image: app.image,
    }

  }

  async removeContainer(container: string) {

  }

  async stopContainer(container: string): Promise<void> {

  }

  async restartContainer(container: string) {
    await this.stopContainer(container);
    await this.startContainer(container);
  }

  async startContainer(container: string): Promise<void> {

  }

  async containerInfo(container: string): Promise<Docker.Container> {
    return null;
  }

  async containers(): Promise<any[]> {
    return [];
  }

  images() {

  }

  pullImage(imageId: string) {
  }

  removeImage(imageId: string) {

  }

}
