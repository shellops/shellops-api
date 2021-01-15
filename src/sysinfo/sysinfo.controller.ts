import { Controller, Get } from '@nestjs/common';

import { SysinfoService } from './sysinfo.service';

@Controller()
export class SysinfoController {

    constructor(private readonly sysInfoService: SysinfoService) {

    }

    @Get('/api/v1/sysinfo/:node/general')
    general() {
        return this.sysInfoService.general();
    }


    @Get('/api/v1/sysinfo/:node/docker')
    docker() {
        return this.sysInfoService.docker();
    }

}
