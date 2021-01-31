import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';

@Module({
  imports: [DatabaseModule],
  providers: [FinancialService],
  exports: [FinancialService],
  controllers: [FinancialController],
})
export class FinancialModule {}
