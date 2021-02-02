import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiGuard } from '../api.guard';
import { DockerService } from './docker.service';

@Controller()
@ApiTags('Docker')
@ApiBasicAuth()
@UseGuards(ApiGuard)
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}


  @Get('/api/v1/docker/containers')
  list() {
    return this.dockerService.containers();
  }

  
  @Get('/api/v1/docker/containers/:containerId')
  @ApiParam({ name: 'containerId' })
  inspect(@Param('containerId') containerId: string) {
    return this.dockerService.containerInfo(containerId);
  }

  @Delete('/api/v1/docker/containers/:containerId')
  @ApiParam({ name: 'containerId' })
  remove(@Param('containerId') containerId: string) {
    return this.dockerService.removeContainer(containerId);
  }

  @Post('/api/v1/docker/containers/:containerId/start')
  start(@Param('containerId') containerId: string) {
    return this.dockerService.startContainer(containerId);
  }

  @Post('/api/v1/docker/containers/:containerId/stop')
  stop(@Param('containerId') containerId: string) {
    return this.dockerService.stopContainer(containerId);
  }

  @Post('/api/v1/docker/containers/:containerId/restart')
  restart(@Param('containerId') containerId: string) {
    return this.dockerService.restartContainer(containerId);
  }
}
