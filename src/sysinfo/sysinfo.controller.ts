import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as svgMap from 'svg-world-map';
import * as domStringify from 'virtual-dom-stringify';
import { ApiGuard } from '../api.guard';

import { Config } from '../config';
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

  @Get('location.svg')
  async geoMap(@Res() res: Response) {
    const { lon, lat } = await this.sysInfoService.geoIp();

    res.setHeader('Content-Type', 'image/svg+xml');

    const map = svgMap(lon, lat, Config.locationMap);

    res.end(domStringify(map));
  }
}
