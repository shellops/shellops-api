import { ENV } from "./env.enum";

export const Config: {
    env: ENV,
    mode: 'API' | 'AGENT',
    host: string,
    port: number
} = {
    env: ENV.DEVELOPMENT,
    mode: process.env['MODE'] as any || 'API', // API or AGENT
    host: '0.0.0.0',
    port: Number(process.env['PORT']) || 3000
};

