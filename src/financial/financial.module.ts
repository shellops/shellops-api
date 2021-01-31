import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { FinancialService } from './financial.service';

@Module({
  imports: [DatabaseModule],
  providers: [FinancialService],
  exports: [FinancialService],
})
export class FinancialModule {}
