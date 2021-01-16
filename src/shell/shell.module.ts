import { Module } from '@nestjs/common';
import { ShellService } from './shell.service';

@Module({
  providers: [ShellService],
  exports: [ShellService]
})
export class ShellModule { }
