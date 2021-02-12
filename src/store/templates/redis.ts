import { AppTemplate } from '../app-template.dto';

export const redis = {
  name: 'Redis',
  version: '6.0',
  description:
    'Redis is an open-source, networked, in-memory, key-value data store with optional durability. It is written in ANSI C. The development of Redis is sponsored by Redis Labs today.',
  image: 'mongo:6.0',
  logo: '/logos/redis-original.svg',
  ports: [{ host: '{{ RANDOM_PORT }}', container: '6379' }],
  variables: [
    {
      name: 'REDIS_PASSWORD',
      value: '{{ RANDOM_PASSWORD }}',
    }
  ],
} as AppTemplate;
