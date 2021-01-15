import { Controller, Get, Res } from '@nestjs/common';

import { SysinfoService } from './sysinfo.service';

import * as svgMap from 'svg-world-map';
import * as domStringify from 'virtual-dom-stringify';
import { Response } from 'express';

@Controller()
export class SysinfoController {

    constructor(private readonly sysInfoService: SysinfoService) {

    }

    @Get('/api/v1/sysinfo/:node/general')
    async general() {
        return this.sysInfoService.general();
    }


    @Get('/api/v1/sysinfo/:node/ip')
    async ip() {
        return this.sysInfoService.ip();
    }


    @Get('/api/v1/sysinfo/:node/geo-ip')
    async geoIp() {
        return this.sysInfoService.geoIp();
    }

    @Get('/api/v1/sysinfo/:node/location.svg')
    async geoMap(@Res() res: Response) {

        const { lon, lat } = await this.sysInfoService.geoIp();

        res.setHeader('Content-Type', 'image/svg+xml');

        const map = svgMap(lon, lat, {
            ocean: 'transparent', // color of the ocean
            land: '#ccc', // color of the land
            mapWidth: 500, // width of the `<svg>`
            pinHeight: 4 // relative to map viewBox
        });

        res.end(domStringify(map));

    }


    @Get('/api/v1/sysinfo/:node/docker')
    async docker() {
        return this.sysInfoService.docker();
    }

}
