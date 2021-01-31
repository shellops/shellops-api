import { Test, TestingModule } from '@nestjs/testing';

import { MachineController } from './machine.controller';
import { MachineModule } from './machine.module';

describe('MachineController', () => {
  let controller: MachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MachineModule],
    }).compile();

    controller = module.get<MachineController>(MachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
