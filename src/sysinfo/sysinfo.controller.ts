import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

import { ApiGuard } from '../api.guard';
import { SysinfoService } from './sysinfo.service';

@Controller('v1/sysinfo')
@ApiTags('SysInfo')
@ApiBasicAuth()
@UseGuards(ApiGuard)
export class SysinfoController {
  constructor(private readonly sysInfoService: SysinfoService) {}
  @Get('docker')
  async docker() {
    return this.sysInfoService.docker();
  }

  @Get('general')
  async general() {
    return this.sysInfoService.general();
  }

  @Get('ip')
  async ip() {
    return this.sysInfoService.ip();
  }

  @Get('geo-ip')
  async geoIp() {
    return this.sysInfoService.geoIp();
  }

}
