import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysinfoModule } from './sysinfo/sysinfo.module';
import { ShellModule } from './shell/shell.module';
import { FtpModule } from './ftp/ftp.module';
import { NodeModule } from './node/node.module';
import { ConfigModule } from './config/config.module';
import { WsModule } from './ws/ws.module';
import { MachineModule } from './machine/machine.module';
import { StoreModule } from './store/store.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DatabaseService } from './database/database.service';
import { AuthService } from './auth/auth.service';
import { FinancialModule } from './financial/financial.module';
import { DockerModule } from './docker/docker.module';

@Module({
  imports: [
    SysinfoModule,
    ShellModule,
    FtpModule,
    NodeModule,
    ConfigModule,
    WsModule,
    MachineModule,
    StoreModule,
    FirebaseModule,
    FinancialModule,
    DockerModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService, AuthService],
})
export class AppModule {}
