import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { DockerModule } from '../docker/docker.module';
import { MachineService } from './machine.service';

@Module({
  imports: [DatabaseModule, DockerModule],
  providers: [MachineService],
})
export class MachineModule {}
