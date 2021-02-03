import { Test, TestingModule } from '@nestjs/testing';

import { FinancialController } from './financial.controller';
import { FinancialModule } from './financial.module';

describe('FinancialController', () => {
  let controller: FinancialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FinancialModule],
    }).compile();

    controller = module.get<FinancialController>(FinancialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
