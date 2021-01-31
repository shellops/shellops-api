import { ApiGuard } from './api.guard';
import { DatabaseService } from './database/database.service';
import { LoggerService } from './database/logger.service';
import { SysinfoService } from './sysinfo/sysinfo.service';

describe('ApiGuard', () => {
  it('should be defined', () => {
    expect(new ApiGuard(new DatabaseService(), new SysinfoService(),new LoggerService())).toBeDefined();
  });
});
