import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShellConfigDto } from '../shell/shell-connect.dto';
import { NodeService } from './node.service';

@Controller()
@ApiTags('Node')
export class NodeController {

    constructor(private readonly nodeService: NodeService) { }

    @Post('/api/v1/node')
    @ApiOperation({ summary: 'Add new node to manage', description: 'adds the node connection to ~/.shellops.json' })
    addNode(@Body() dto: ShellConfigDto) {
        return this.nodeService.addNode(dto);
    }

    @Get('/api/v1/nodes')
    @ApiOperation({ summary: 'Get list of current nodes', description: 'reads node list from ~/.shellops.json' })
    listNodes() {
        return this.nodeService.listNodes();
    }


}
