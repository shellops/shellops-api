import { Module } from '@nestjs/common';

import { SysinfoController } from './sysinfo.controller';
import { SysinfoService } from './sysinfo.service';

@Module({
  providers: [SysinfoService],
  controllers: [SysinfoController],
  imports: [],
})
export class SysinfoModule { }
