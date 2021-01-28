import { Module } from '@nestjs/common';

import { WsModule } from '../ws/ws.module';
import { ShellService } from './shell.service';
import { ShellController } from './shell.controller';

@Module({
  providers: [ShellService],
  exports: [ShellService],
  imports: [WsModule],
  controllers: [ShellController],
})
export class ShellModule {}
