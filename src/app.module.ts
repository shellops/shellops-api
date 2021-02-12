import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { DockerModule } from './docker/docker.module';
import { FinancialModule } from './financial/financial.module';
import { MachineModule } from './machine/machine.module';
import { StoreModule } from './store/store.module';
import { SysinfoModule } from './sysinfo/sysinfo.module';
import { WsModule } from './ws/ws.module';
import { AppService } from './app/app.service';

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
  providers: [AppService ],
})
export class AppModule { }
