import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { DockerModule } from '../docker/docker.module';
import { SysinfoModule } from '../sysinfo/sysinfo.module';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
  imports: [SysinfoModule, DatabaseModule, DockerModule],
  providers: [MachineService],
  exports: [MachineService],
  controllers: [MachineController],
})
export class MachineModule {}
