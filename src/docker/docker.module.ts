import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';

@Module({
  providers: [DockerService]
})
export class DockerModule {}
