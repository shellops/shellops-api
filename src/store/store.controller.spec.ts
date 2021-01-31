import { Test, TestingModule } from '@nestjs/testing';

import { StoreController } from './store.controller';
import { StoreModule } from './store.module';

describe('StoreController', () => {
  let controller: StoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StoreModule],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
