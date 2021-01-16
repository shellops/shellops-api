import 'source-map-support/register';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { configureMiddlewares } from './configure-middlewares';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from './config/config.service';

process.on('unhandledRejection', (e: Error) => {
  Logger.error('unhandledRejection: ' + e.message, e.stack);
});

process.on('uncaughtException', (e: Error) => {
  Logger.error('uncaughtException: ' + e.message, e.stack);
});

export async function bootstrap() {

  const { port, host } = new ConfigService().config;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.useWebSocketAdapter(new WsAdapter(app) as any);


  configureMiddlewares(app);

  app.enableShutdownHooks();

  await app.init();

  await app.listen(port, host);

  Logger.verbose(
    `Http server is listening ${await app.getUrl()} with NODE_ENV=${process.env.NODE_ENV}`,
    'Server'
  );
}


bootstrap();