import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as svgMap from 'svg-world-map';
import * as domStringify from 'virtual-dom-stringify';

import { Config } from '../config';
import { SysinfoService } from './sysinfo.service';

@Controller()
@ApiTags('SysInfo')
export class SysinfoController {
  constructor(
    private readonly sysInfoService: SysinfoService,
  ) { }

  @Get('/api/v1/sysinfo/:node/docker')
  async docker() {
    return this.sysInfoService.docker();
  }

  @Get('/api/v1/sysinfo/general')
  async general() {
    return this.sysInfoService.general();
  }

  @Get('/api/v1/sysinfo/ip')
  async ip() {
    return this.sysInfoService.ip();
  }

  @Get('/api/v1/sysinfo/geo-ip')
  async geoIp() {
    return this.sysInfoService.geoIp();
  }

  @Get('/api/v1/sysinfo/location.svg')
  async geoMap(@Res() res: Response) {
    const { lon, lat } = await this.sysInfoService.geoIp();

    res.setHeader('Content-Type', 'image/svg+xml');

    const map = svgMap(lon, lat, Config.locationMap);

    res.end(domStringify(map));
  }

}
