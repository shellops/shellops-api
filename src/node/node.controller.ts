import { Controller } from '@nestjs/common';
import { NodeService } from './node.service';

@Controller()
export class NodeController {

    constructor(private readonly nodeService: NodeService) { }

    addNode() {

    }


}
