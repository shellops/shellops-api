import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShellConnectDto } from '../shell/shell-connect.dto';
import { NodeService } from './node.service';

@Controller()
export class NodeController {

    constructor(private readonly nodeService: NodeService) { }

    @Post('/api/v1/node')
    addNode(@Body() dto: ShellConnectDto) {
        return this.nodeService.addNode(dto);
    }

    @Get('/api/v1/nodes')
    listNodes() {
        return this.nodeService.listNodes();
    }


}
