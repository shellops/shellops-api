import { Module } from '@nestjs/common';

import { DockerService } from './docker.service';
import { DockerController } from './docker.controller';
import { WsModule } from '../ws/ws.module';
import { DatabaseModule } from '../database/database.module';
import { SysinfoModule } from '../sysinfo/sysinfo.module';

@Module({
  imports: [WsModule, DatabaseModule, SysinfoModule],
  providers: [DockerService],
  exports: [DockerService],
  controllers: [DockerController],
})
export class DockerModule {}
