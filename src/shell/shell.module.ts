import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { WsModule } from '../ws/ws.module';
import { ShellService } from './shell.service';
import { ShellController } from './shell.controller';

@Module({
  providers: [ShellService],
  exports: [ShellService],
  imports: [ConfigModule, WsModule],
  controllers: [ShellController],
})
export class ShellModule {}
