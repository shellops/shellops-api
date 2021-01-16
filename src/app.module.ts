import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysinfoModule } from './sysinfo/sysinfo.module';
import { ShellModule } from './shell/shell.module';
import { FtpModule } from './ftp/ftp.module';
import { NodeModule } from './node/node.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [SysinfoModule, ShellModule, FtpModule, NodeModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
