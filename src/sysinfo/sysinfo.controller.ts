import { BadRequestException, Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as http from 'http';
import * as ssh2 from 'ssh2';
import * as svgMap from 'svg-world-map';
import * as domStringify from 'virtual-dom-stringify';

import { ConfigService } from '../config/config.service';
import { SysinfoService } from './sysinfo.service';

@Controller()
@ApiTags('SysInfo')
export class SysinfoController {

    constructor(
        private readonly sysInfoService: SysinfoService,
        private readonly configService: ConfigService) { }

    private getNodeAgent(node: string) {

        const conn = this.configService.config.nodes.find(p => p.host === node);

        if (!conn) throw new BadRequestException('node not found');

        const agent = new (ssh2 as any).HTTPAgent(conn);

        agent.defaultPort = 3000;

        return agent;
    }

    @Get('/api/v1/sysinfo/:node/general')
    async general(@Res() res: Response, @Param('node') node: string) {
        if (node === 'localhost')
            res.json(await this.sysInfoService.general());
        else {
            const agent = this.getNodeAgent(node);
            http.get({
                path: '/api/v1/sysinfo/localhost/general',
                agent,
                headers: { Connection: 'close' }
            }, (proxyRes) => {
                proxyRes.pipe(res);
            });
        }
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
