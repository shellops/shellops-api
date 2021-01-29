import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Modem from 'docker-modem';
import { v4 as uuid } from 'uuid';

import { Config } from '../config';
import { MachineApp } from '../machine/machine-app.dto';
import { ShellService } from '../shell/shell.service';
import { AppTemplate } from '../store/app-template.dto';

@Injectable()
export class DockerService extends ShellService implements OnModuleInit {

  modem = new Modem({ socketPath: Config.dockerSocket });

  async onModuleInit() {

  }

  createContainer(app: Partial<MachineApp>): Promise<{ Id: string }> {

    const name = `${app.name.toLowerCase().replace(/\s/g, '-')}_${app.id || uuid()}`;

    const container: Partial<Docker.Container> = {
      Image: app.image,
      Env: (app.variables || [])?.map(item => `${item.name}=${item.value}`),
      HostConfig: {
        Links: (app.links || [])?.map(item => `${item.host}:${item.container}`),
        Binds: (app.mounts || [])?.map(item => `${item.host}:${item.container}`),
        RestartPolicy: { Name: 'always' },
        PortBindings: app.ports.reduce<any>(
          (memo: any, curr) =>
          ({
            ...memo,
            [`${curr.container}/${curr.type || 'tcp'}`]: [{ HostPort: String(curr.host) }]
          }), {})
      }
    };

    const call = {
      path: '/containers/create?',
      method: 'POST',
      options: { ...container, name },
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

  async removeContainer(containerId: string) {
    const call = {
      path: `/containers/${containerId}?`,
      method: 'DELETE',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve();
      })
    });
  }

  async restartContainer(container: string) {
    await this.stopContainer(container);
    await this.startContainer(container);
  }

  async startContainer(containerId: string): Promise<void> {
    const call = {
      path: `/containers/${containerId}/start?`,
      method: 'POST',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve();
      })
    })
  }

  async stopContainer(containerId: string): Promise<void> {
    const call = {
      path: `/containers/${containerId}/stop?`,
      method: 'POST',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve();
      })
    });

  }

  async removeImage(image: string): Promise<void> {
    const call = {
      path: `/images/${image}?`,
      method: 'DELETE',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve();
      })
    });
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



}
