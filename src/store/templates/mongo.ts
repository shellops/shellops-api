import { AppTemplate } from '../app-template.dto';

export const mongo = {
  name: 'MongoDB',
  version: '4.2',
  description:
    'MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemata.',
  image: 'mongo:4.2',
  logo: '/assets/logos/mongodb-original.svg',
  ports: [{ host: '{{ RANDOM_PORT }}', container: '27017' }],
  variables: [
    {
      name: 'MONGO_INITDB_ROOT_PASSWORD',
      value: '{{ RANDOM_PASSWORD }}',
    },
    {
      name: 'MONGO_INITDB_ROOT_USERNAME',
      value: '{{ RANDOM_USERNAME }}',
    },
  ],
} as AppTemplate;
