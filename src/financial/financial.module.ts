import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';

@Module({
  providers: [FinancialService],
})
export class FinancialModule {}
