import { Test, TestingModule } from '@nestjs/testing';

import { SysinfoController } from './sysinfo.controller';
import { SysinfoModule } from './sysinfo.module';

describe('SysinfoController', () => {
  let controller: SysinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SysinfoModule],
    }).compile();

    controller = module.get<SysinfoController>(SysinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
