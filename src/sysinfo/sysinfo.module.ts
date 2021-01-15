import { Module } from '@nestjs/common';
import { SysinfoService } from './sysinfo.service';
import { SysinfoController } from './sysinfo.controller';

@Module({
  providers: [SysinfoService],
  controllers: [SysinfoController]
})
export class SysinfoModule {}
