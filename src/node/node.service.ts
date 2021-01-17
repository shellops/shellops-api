import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ShellConfigDto } from '../shell/shell-connect.dto';
import { ShellService } from '../shell/shell.service';

@Injectable()
export class NodeService {


    constructor(
        private readonly shellService: ShellService,
        private readonly configService: ConfigService) { }


    listNodes() {
        return this.configService.config.nodes
    }

    async addNode(dto: ShellConfigDto) {

        try {
            const client = await this.shellService.createAndConnectClient(dto);

            client.connection.end();

        } catch (error) {
            throw new BadRequestException(error.message);
        }

        this.configService.config.nodes.push(dto);
        this.configService.saveConfig();

        this.shellService
            .setupClient(dto)
            .catch((err) =>
                Logger.error(`Failed to setup client after add: ${err.message}`, err.stack, NodeService.name));

    }

}
