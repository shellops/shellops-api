import { Test, TestingModule } from '@nestjs/testing';
import { SysinfoService } from './sysinfo.service';

describe('SysinfoService', () => {
  let service: SysinfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysinfoService],
    }).compile();

    service = module.get<SysinfoService>(SysinfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
