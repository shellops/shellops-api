import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppTemplate } from '../store/app-template.dto';
import { MachineApp } from './machine-app.dto';
import { MachineService } from './machine.service';

@Controller()
@ApiTags('Machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get('/api/v1/machine/apps')
  @ApiBody({ type: MachineApp, isArray: true })
  getApps() {
    return this.machineService.getApps();
  }

  @Post('/api/v1/machine/apps')
  @ApiBody({ type: AppTemplate })
  @ApiResponse({ type: MachineApp, isArray: true })
  installApp(@Body() template: AppTemplate) {
    return this.machineService.installApp(template);
  }

  @Delete('/api/v1/machine/apps')
  uninstallApps() {
    return this.machineService.uninstallApps();
  }

  @Get('/api/v1/machine/apps/:appId')
  @ApiBody({ type: MachineApp, isArray: true })
  @ApiParam({ name: 'appId' })
  getApp(@Param('appId') appId: string) {
    return this.machineService.getApp(appId);
  }

  @Delete('/api/v1/machine/apps/:appId')
  @ApiBody({ type: MachineApp, isArray: true })
  @ApiParam({ name: 'appId' })
  uninstallApp(@Param('appId') appId: string) {
    return this.machineService.getApp(appId);
  }

  @Post('/api/v1/machine/apps/:appId/start')
  startApp(@Param('appId') appId: string) {
    return this.machineService.startApp(appId);
  }

  @Post('/api/v1/machine/apps/:appId/stop')
  stopApp(@Param('appId') appId: string) {
    return this.machineService.startApp(appId);
  }

  @Post('/api/v1/machine/apps/:appId/restart')
  restartApp(@Param('appId') appId: string) {
    return this.machineService.restartApp(appId);
  }
}
