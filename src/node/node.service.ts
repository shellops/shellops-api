import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ShellConfigDto } from '../shell/shell-connect.dto';
import { ShellService } from '../shell/shell.service';

@Injectable()
export class NodeService {


    constructor(
        private readonly shellService: ShellService,
        private readonly configService: ConfigService) { }


    listNodes() {
        return this.configService.config.connections
    }

    async addNode(dto: ShellConfigDto) {

        console.log({ dto })
        try {
            const client = await this.shellService.createAndConnectClient(dto);

            client.connection.end();

        } catch (error) {
            throw new BadRequestException(error.message);
        }

        this.configService.config.connections.push(dto);
        this.configService.saveConfig();

    }

}
