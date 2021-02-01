import { AppTemplate } from '../app-template.dto';

export const postgres = {
  name: 'PostgreSQL',
  description:'PostgreSQL, often simply "Postgres", is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards-compliance.',
  image: 'postgres:latest',
  logo: '/assets/logos/postgresql-original.svg',
  ports: [{ host: '{{ RANDOM_PORT }}', container: '5432' }],
  variables: [{
    name:'POSTGRES_PASSWORD',
    description: 'Root password for PostgreSQL instance',
    value: '{{ RANDOM_PASSWORD }}'
  }]
} as AppTemplate;
