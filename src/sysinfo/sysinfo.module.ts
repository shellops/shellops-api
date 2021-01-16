import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { SysinfoController } from './sysinfo.controller';
import { SysinfoService } from './sysinfo.service';

@Module({
  providers: [SysinfoService],
  controllers: [SysinfoController],
  imports: [ConfigModule]
})
export class SysinfoModule { }
