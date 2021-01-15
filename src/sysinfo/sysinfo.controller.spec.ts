import { Test, TestingModule } from '@nestjs/testing';
import { SysinfoController } from './sysinfo.controller';

describe('SysinfoController', () => {
  let controller: SysinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysinfoController],
    }).compile();

    controller = module.get<SysinfoController>(SysinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
