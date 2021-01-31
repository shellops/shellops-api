import { Test, TestingModule } from '@nestjs/testing';

import { MachineModule } from './machine.module';
import { MachineService } from './machine.service';

describe('MachineService', () => {
  let service: MachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MachineModule],
    }).compile();

    service = module.get<MachineService>(MachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
