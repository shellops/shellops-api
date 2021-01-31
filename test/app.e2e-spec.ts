import { INestApplication } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useWebSocketAdapter(new WsAdapter(app) as any);

    await app.init();
  });

  it('/api/v1/sysinfo/general (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/sysinfo/general')
      .expect(200);
  });
});
