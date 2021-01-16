import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { ShellModule } from '../shell/shell.module';

@Module({
  providers: [NodeService],
  controllers: [NodeController],
  imports: [ShellModule],
})
export class NodeModule {}
