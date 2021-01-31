import { ENV } from './env.enum';

export const Config: {
  [key: string]: any;
  env: ENV;
  mode: 'API' | 'AGENT';
  host: string;
  port: number;
  dockerSocket: string;
} = {
  env: ENV.DEVELOPMENT,
  mode: (process.env['MODE'] as any) || 'AUTO' , // API or AGENT
  host: '0.0.0.0',
  port: Number(process.env['PORT']) || 3000,
  locationMap: {
    ocean: 'transparent', // color of the ocean
    land: '#ccc', // color of the land
    mapWidth: 500, // width of the `<svg>`
    pinHeight: 4, // relative to map viewBox
  },
  dockerSocket: process.env['DOCKER_SOCKET'] || '/var/run/docker.sock',
};
