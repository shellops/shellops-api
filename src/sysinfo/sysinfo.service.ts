import { Injectable } from '@nestjs/common';
import * as info from 'systeminformation';

@Injectable()
export class SysinfoService {

    async general() {
        return {
            memories: await info.memLayout(),
            cpu: await info.cpu(),
            disks: await info.diskLayout(),
            graphics: await info.graphics(),
            os: await info.osInfo(),
            system: await info.system(),
            networks: await info.networkInterfaces(),
            versions: await info.versions(),
        }
    }

    async docker() {
        return {
            docker: await info.dockerInfo(),
            containers: await info.dockerContainers()
        }
    }



}
