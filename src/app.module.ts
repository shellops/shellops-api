import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app/app.service';
import { DatabaseModule } from './database/database.module';
import { DockerModule } from './docker/docker.module';
import { FinancialModule } from './financial/financial.module';
import { HttpExceptionsFilter } from './http.exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { MachineModule } from './machine/machine.module';
import { ShellService } from './shell/shell.service';
import { StoreModule } from './store/store.module';
import { SysinfoModule } from './sysinfo/sysinfo.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [
    SysinfoModule,
    WsModule,
    MachineModule,
    StoreModule,
    FinancialModule,
    DockerModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ShellService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionsFilter }
  ],
})
export class AppModule { }
