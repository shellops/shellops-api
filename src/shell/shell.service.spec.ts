import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '../app/app.service';
import { DatabaseModule } from '../database/database.module';
import { SysinfoModule } from '../sysinfo/sysinfo.module';
import { ShellService } from './shell.service';

describe('ShellService', () => {
  let service: ShellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShellService, AppService],
      imports: [DatabaseModule, SysinfoModule]
    }).compile();

    service = module.get<ShellService>(ShellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
