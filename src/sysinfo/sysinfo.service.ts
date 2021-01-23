import { Injectable } from '@nestjs/common';
import * as info from 'systeminformation';
import fetch from 'node-fetch'

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

    async ip() {
        return (await fetch('https://ifconfig.me/ip', { method: 'GET' })).text()
    }

    async geoIp() {
        const ip = await this.ip();

        const { city, country, countryCode, isp, lat, lon } =
            await (await fetch(`http://demo.ip-api.com/json/${ip}`, { method: 'GET' })).json()

        return { city, country, countryCode, isp, lat, lon, ip }

    }

    async docker() {
        return {
            ...await info.dockerInfo(),
            containers: await info.dockerContainers(),
        }
    }



}
