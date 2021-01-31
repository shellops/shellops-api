import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { SysinfoController } from './sysinfo.controller';
import { SysinfoService } from './sysinfo.service';

@Module({
  providers: [SysinfoService],
  exports: [SysinfoService],
  controllers: [SysinfoController],
  imports: [DatabaseModule],
})
export class SysinfoModule {}
