import { Injectable } from '@nestjs/common';
import { ShellConnectDto } from '../shell/shell-connect.dto';
import { ShellService } from '../shell/shell.service';

@Injectable()
export class NodeService {


    constructor(private readonly shellService: ShellService) { }

    addNode(dto: ShellConnectDto) {
        
    }

}
