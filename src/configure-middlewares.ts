import 'source-map-support/register';

import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { readFileSync } from 'fs-extra';
import * as helmet from 'helmet';
import { join } from 'path';

import { Config } from './config';

export function configureMiddlewares(app: NestExpressApplication) {

  app.enableCors();
  app.use(compression());
  app.use(helmet());
 
 
  const options = new DocumentBuilder()
    .setTitle('SHELLOPS API')
    .setDescription(
      `Environment: ${Config.env} - [Shellops.io](https://shellops.io)`,
    )
    .addBasicAuth({
      type: 'http',
      description: 'Use for connecting to remote machines',
    })
    .addBearerAuth({
      type: 'http',
      description: 'Use for calling shellops services',
    })
    .setVersion(require(join(__dirname, '../package.json')).version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document, {
    customCss: readFileSync(
      join(__dirname, '../swagger/swagger.css'),
    ).toString(),
    customJs: 'swagger.js',
  });
}
