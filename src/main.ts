#!/usr/bin/env node
import 'source-map-support/register';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import * as chalk from 'chalk';
import { join } from 'path';

import { AppModule } from './app.module';
import { Config } from './config';
import { configureMiddlewares } from './configure-middlewares';
import { LoggerService } from './database/logger.service';

process.on('unhandledRejection', (e: Error) => {
  Logger.error('unhandledRejection: ' + e.message, e.stack);
});

process.on('uncaughtException', (e: Error) => {
  Logger.error('uncaughtException: ' + e.message, e.stack);
});

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'verbose'],
  });

  app.setGlobalPrefix('api'); // make all routes in api

  app.useLogger(app.get(LoggerService));
  app.useWebSocketAdapter(new WsAdapter(app) as any);

  app.useStaticAssets(join(__dirname, '../public'));

  configureMiddlewares(app);

  app.enableShutdownHooks();

  await app.init();

  await app.listen(Config.port, Config.host);

  app
    .get(LoggerService)
    .verbose(
      chalk.bgBlack.greenBright`\nENV: ` +
        chalk.yellow`${Config.env}` +
        chalk.bgBlack.greenBright`\nMODE: ` +
        chalk.yellow`${Config.mode}` +
        chalk.bgBlack.greenBright`\nSWAGGER: ` +
        chalk.yellow`${await app.getUrl()}/swagger` +
        chalk.bgBlack.greenBright`\nSOCKET: ` +
        chalk.yellow`${Config.dockerSocket}`,
    );
}

bootstrap();
