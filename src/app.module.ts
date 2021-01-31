import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SysinfoModule } from './sysinfo/sysinfo.module';
import { ShellModule } from './shell/shell.module';
import { WsModule } from './ws/ws.module';
import { MachineModule } from './machine/machine.module';
import { StoreModule } from './store/store.module';
import { FinancialModule } from './financial/financial.module';
import { DockerModule } from './docker/docker.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    SysinfoModule,
    ShellModule,
    WsModule,
    MachineModule,
    StoreModule,
    FinancialModule,
    DockerModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
