import { Machine } from "../machine/machine";

export class AppTemplate {
  name: string;

  dockerfile: string;

  description: string;

  logo: string;

  screenshots: { url: string; label: string; description: string }[];

  website: string;

  github: string;

  docs: string;

  author: string;

  image: string;

  version: string;

  revision: number;

  mounts: {
    host: string;
    container: string;
  }[];

  webPort?: number;

  ports: {
    type?: 'tcp' | 'udp',
    host: number;
    container: number;
  }[];

  dependencies?: Machine[];

  variables: {
    name: string;
    description: string;
    value: string;
  }[];
}
