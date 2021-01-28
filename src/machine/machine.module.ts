import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MachineService } from './machine.service';

@Module({
  imports: [DatabaseModule],
  providers: [MachineService],
})
export class MachineModule { }
