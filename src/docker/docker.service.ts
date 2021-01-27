import { Injectable } from '@nestjs/common';
import { ShellService } from '../shell/shell.service';

@Injectable()
export class DockerService extends ShellService{

    createCotnainer(container: string, options: { ports, env, mounts }) {

    }

    deleteContainer(container: string)

    stopContainer(container: string);
    startContainer(container: string);
    
    containerInfo(container: string);
    containers()
    images()
    
    pullImage(image: string);
    deleteImage(image: string);

}