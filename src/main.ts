import 'source-map-support/register';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { configureMiddlewares } from './configure-middlewares';

process.on('unhandledRejection', (e: Error) => {
  Logger.error('unhandledRejection: ' + e.message, e.stack);
});

process.on('uncaughtException', (e: Error) => {
  Logger.error('uncaughtException: ' + e.message, e.stack);
});

export async function bootstrap() {

  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || '127.0.0.1';

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  configureMiddlewares(app);

  app.enableShutdownHooks();

  await app.init();

  await app.listen(port, host);

  Logger.verbose(
    `Started at ${await app.getUrl()} with NODE_ENV=${process.env.NODE_ENV}`,
    'Server'
  );
}


bootstrap();