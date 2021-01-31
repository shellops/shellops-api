import { Test, TestingModule } from '@nestjs/testing';

import { FinancialModule } from './financial.module';
import { FinancialService } from './financial.service';

describe('FinancialService', () => {
  let service: FinancialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FinancialModule],
    }).compile();

    service = module.get<FinancialService>(FinancialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
