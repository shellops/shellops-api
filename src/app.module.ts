import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysinfoModule } from './sysinfo/sysinfo.module';
import { ShellModule } from './shell/shell.module';
import { FtpModule } from './ftp/ftp.module';

@Module({
  imports: [SysinfoModule, ShellModule, FtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
