import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ShellService } from './shell.service';

@Controller()
export class ShellController {


    constructor(private readonly shellService: ShellService) { }



    @Post('/api/v1/shell/:node/docker')
    @ApiOperation({ summary: 'Installs docker on remote/local node' })
    async installDocker(@Param('node') node: string) {

        const client = await this.shellService.getShellByHostname(node);

        await this.shellService.installDocker(client);

        client.connection.end();

    }


    @Delete('/api/v1/shell/:node/docker')
    @ApiOperation({ summary: 'Installs docker on remote/local node' })
    async uninstallDocker(@Param('node') node: string) {

        const client = await this.shellService.getShellByHostname(node);

        await this.shellService.uninstallDocker(client);

        client.connection.end();

    }


}
