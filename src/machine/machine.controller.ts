import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from '../api.guard';

import { AppTemplate } from '../store/app-template.dto';
import { MachineApp } from './machine-app.dto';
import { MachineService } from './machine.service';

@Controller('v1/machine')
@ApiTags('Machine')
@ApiBasicAuth()
@UseGuards(ApiGuard)
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get('machine/apps')
  @ApiBody({ type: MachineApp, isArray: true })
  getApps() {
    return this.machineService.getApps();
  }

  @Post('apps')
  @ApiBody({ type: AppTemplate })
  @ApiResponse({ type: MachineApp, isArray: true })
  installApp(@Body() template: AppTemplate) {
    return this.machineService.installApp(template);
  }

  @Delete('apps')
  uninstallApps() {
    return this.machineService.uninstallApps();
  }

  @Get('apps/:appId')
  @ApiBody({ type: MachineApp, isArray: true })
  @ApiParam({ name: 'appId' })
  getApp(@Param('appId') appId: string) {
    return this.machineService.getApp(appId);
  }

  @Delete('apps/:appId')
  @ApiBody({ type: MachineApp, isArray: true })
  @ApiParam({ name: 'appId' })
  uninstallApp(@Param('appId') appId: string) {
    return this.machineService.getApp(appId);
  }

  @Post('apps/:appId/start')
  startApp(@Param('appId') appId: string) {
    return this.machineService.startApp(appId);
  }

  @Post('apps/:appId/stop')
  stopApp(@Param('appId') appId: string) {
    return this.machineService.startApp(appId);
  }

  @Post('apps/:appId/restart')
  restartApp(@Param('appId') appId: string) {
    return this.machineService.restartApp(appId);
  }
}
