#!/usr/bin/env node

import 'source-map-support/register';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { configureMiddlewares } from './configure-middlewares';
import { WsAdapter } from '@nestjs/platform-ws';
import { join } from 'path';
import { Config } from './config';

process.on('unhandledRejection', (e: Error) => {
  Logger.error('unhandledRejection: ' + e.message, e.stack);
});

process.on('uncaughtException', (e: Error) => {
  Logger.error('uncaughtException: ' + e.message, e.stack);
});

export async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.useWebSocketAdapter(new WsAdapter(app) as any);

  app.useStaticAssets(join(__dirname, '../public'));

  configureMiddlewares(app);

  app.enableShutdownHooks();

  await app.init();

  await app.listen(Config.port, Config.host);

  Logger.verbose(
    `Http server is listening ${await app.getUrl()} with NODE_ENV=${
      process.env.NODE_ENV
    }`,
    'Server',
  );
}

bootstrap();
