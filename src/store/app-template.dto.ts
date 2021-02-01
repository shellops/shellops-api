import { MachineApp } from '../machine/machine-app.dto';

export class AppTemplate {
  name: string;

  dockerfile?: string;

  description?: string;

  logo?: string;

  screenshots?: { url: string; label: string; description: string }[];

  website?: string;

  github?: string;

  docs?: string;

  author?: string;

  image?: string;

  version?: string;

  revision?: number;

  mounts?: {
    host: string;
    container: string;
  }[];

  webPort?: string;

  ports: {
    type?: 'tcp' | 'udp';
    host: string;
    container: string;
  }[];

  dependencies?: MachineApp[];

  variables?: {
    name: string;
    description: string;
    value: string;
  }[];
}
