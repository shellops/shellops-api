import { AppTemplate } from '../app-template.dto';

export const mysql = {
  name: 'MySQL',
  description:'MySQL is the world\'s most popular open source database. With its proven performance, reliability and ease-of-use, MySQL has become the leading database choice for web-based applications',
  image: 'mysql:latest',
  logo: '/assets/logos/mysql-original.svg',
  ports: [{ host: '{{ RANDOM_PORT }}', container: '3306' }],
  variables: [{
    name:'MYSQL_ROOT_PASSWORD',
    description: 'Root password for MySQL instance',
    value: '{{ RANDOM_PASSWORD }}'
  }]
} as AppTemplate;
