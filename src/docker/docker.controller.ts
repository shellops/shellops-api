import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiGuard } from '../api.guard';
import { DockerService } from './docker.service';

@Controller('v1/docker')
@ApiTags('Docker')
@ApiBasicAuth()
@UseGuards(ApiGuard)
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}


  @Get('containers')
  list() {
    return this.dockerService.containers();
  }

  
  @Get('containers/:containerId')
  @ApiParam({ name: 'containerId' })
  inspect(@Param('containerId') containerId: string) {
    return this.dockerService.containerInfo(containerId);
  }

  @Delete('containers/:containerId')
  @ApiParam({ name: 'containerId' })
  remove(@Param('containerId') containerId: string) {
    return this.dockerService.removeContainer(containerId);
  }

  @Post('containers/:containerId/start')
  start(@Param('containerId') containerId: string) {
    return this.dockerService.startContainer(containerId);
  }

  @Post('containers/:containerId/stop')
  stop(@Param('containerId') containerId: string) {
    return this.dockerService.stopContainer(containerId);
  }

  @Post('containers/:containerId/restart')
  restart(@Param('containerId') containerId: string) {
    return this.dockerService.restartContainer(containerId);
  }
}
