import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Modem from 'docker-modem';
import { watch } from 'fs-extra';
import { Stream } from 'stream';

import { Config } from '../config';
import { MachineApp } from '../machine/machine-app.dto';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class DockerService implements OnModuleInit, OnModuleDestroy {
  modem = new Modem({ socketPath: Config.dockerSocket });
  watchList: string[] = [];
  watchStreams: Stream[] = [];
  constructor(private readonly wsGateway: WsGateway) { }

  onModuleInit() {
    this.statsWatchListUpdater();
  }

  async onModuleDestroy() {
    for (const stream of this.watchStreams) {
      stream.removeAllListeners();
    }
  }

  async statsWatchListUpdater() {
    const containers = await this.containers();

    containers
      .filter((p) => !this.watchList.includes(p.Id))
      .forEach((container) => {
        this.watchList.push(container.Id);

        this.containerStats(container.Id).then((stream) => {
          this.watchStreams.push(stream);
          stream.on('data', async (chunk) => {
            const stats = JSON.parse(String(chunk));
            const info = await this.containerInfo(
              container.Id,
            );
            this.wsGateway.broadcast(
              JSON.stringify({
                type: 'CONTAINER_STATS',
                payload: { container: info, stats },
              }),
            );
          });
        });
      });
    setTimeout(() => {
      this.statsWatchListUpdater();
    }, 10000);
  }

  public async createContainer(
    app: Partial<MachineApp>,
  ): Promise<{ Id: string }> {
    const name = app.container;

    const container: Partial<Docker.Container> = {
      Image: app.image,
      Env: (app.variables || [])?.map((item) => `${item.name}=${item.value}`),
      HostConfig: {
        Links: (app.links || [])?.map(
          (item) => `${item.host}:${item.container}`,
        ),
        Binds: (app.mounts || [])?.map(
          (item) => `${item.host}:${item.container}`,
        ),
        RestartPolicy: { Name: 'always' },
        PortBindings: app.ports?.reduce<any>(
          (memo: any, curr) => ({
            ...memo,
            [`${curr.container}/${curr.type || 'tcp'}`]: [
              { HostPort: String(curr.host) },
            ],
          }),
          {},
        ),
      },
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
        500: 'server error',
      },
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err);

        resolve(data);
      });
    });
  }

  public async removeContainer(containerId: string) {
    const call = {
      path: `/containers/${containerId}?`,
      method: 'DELETE',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error',
      },
    };

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  public async startContainer(containerId: string): Promise<void> {
    const call = {
      path: `/containers/${containerId}/start?`,
      method: 'POST',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error',
      },
    };

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  public async stopContainer(containerId: string): Promise<void> {
    const call = {
      path: `/containers/${containerId}/stop?`,
      method: 'POST',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error',
      },
    };

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  public async restartContainer(containerId: string) {
    await this.stopContainer(containerId);
    await this.startContainer(containerId);
  }

  public async removeImage(image: string): Promise<void> {
    const call = {
      path: `/images/${image}?`,
      method: 'DELETE',
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error',
      },
    };

    await new Promise<void>((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  /**
   * Get detailed info
   * @param containerId
   */
  public async containerInfo(containerId: string): Promise<Docker.Container> {
    const call = {
      path: `/containers/${containerId}/json?`,
      method: 'GET',
      statusCodes: {
        200: true,
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error',
      },
    };

    return new Promise<any>((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  public async containerStats(containerId: string): Promise<Stream> {
    const call = {
      path: `/containers/${containerId}/stats?`,
      method: 'GET',
      isStream: true,
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error',
      },
    };

    return new Promise<any>((resolve, reject) => {
      this.modem.dial(call, (err, stream: Stream) => {
        if (err) return reject(err);

        resolve(stream);
      });
    });
  }

  /**
   * Get machine containers
   */
  public async containers(): Promise<Docker.Container[]> {
    const call = {
      path: `/containers/json?all=true`,
      method: 'GET',
      statusCodes: {
        200: true,
        204: true,
        304: true,
        500: 'server error',
      },
    };

    return new Promise<any>((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  /**
   * Get currently available images on machine
   */
  public async images(): Promise<Docker.Image[]> {
    const call = {
      path: `/images/json?`,
      method: 'GET',
      statusCodes: {
        200: true,
        204: true,
        304: true,
        500: 'server error',
      },
    };

    return new Promise<any>((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  /**
   * Pull image from dockerhub
   */
  public async pullImage(image: string): Promise<Stream> {
    const call = {
      path: '/images/create?',
      method: 'POST',
      options: {
        fromImage: image.split(':')[0],
        tag: image.split(':')[1],
      },
      isStream: true,
      statusCodes: {
        200: true,
        500: 'server error',
      },
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, stream: Stream) => {
        if (err) return reject(err);
        resolve(stream);
      });
    });
  }
}
