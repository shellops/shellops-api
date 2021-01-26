import { ApiOperation } from '@nestjs/swagger';
import { GitRepoReq } from './git-repo.req.dto';
import { ShellService } from './shell.service';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

@Controller()
export class ShellController {
    constructor(private readonly shellService: ShellService) {}

    @Post('/api/v1/shell/:node/poste')
    @ApiOperation({ summary: 'Installs docker on remote/local node' })
    async installPoste(@Param('node') node: string) {
        const client = await this.shellService.getShellByHostname(node);

        await this.shellService.installPoste(client);

        client.connection.end();
    }

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

    @Post('/api/v1/shell/:node/git-repo')
    @ApiOperation({ summary: 'Installs docker on remote/local node' })
    async installFromGitRepo(
        @Param('node') node: string,
        @Body() gitRepoReg: GitRepoReq,
    ) {
        const client = await this.shellService.getShellByHostname(node);

        await this.shellService.installFromGitRepo(client, gitRepoReg);

        client.connection.end();
    }
}
