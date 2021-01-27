import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';

@Module({
  providers: [MachineService],
})
export class MachineModule {}
