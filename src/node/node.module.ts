import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { ShellModule } from '../shell/shell.module';
import { ConfigModule } from '../config/config.module';

@Module({
  providers: [NodeService],
  controllers: [NodeController],
  imports: [ShellModule, ConfigModule],
})
export class NodeModule { }
