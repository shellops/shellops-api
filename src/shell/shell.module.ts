import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { WsModule } from '../ws/ws.module';
import { ShellService } from './shell.service';

@Module({
  providers: [ShellService],
  exports: [ShellService],
  imports: [ConfigModule, WsModule]
})
export class ShellModule { }
