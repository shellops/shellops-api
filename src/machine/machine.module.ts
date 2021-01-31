import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { DockerModule } from '../docker/docker.module';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';

@Module({
  imports: [DatabaseModule, DockerModule],
  providers: [MachineService],
  exports: [MachineService],
  controllers: [MachineController],
})
export class MachineModule {}
