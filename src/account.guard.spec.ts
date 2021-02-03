import { LoggerService } from './database/logger.service';
import { AccountGuard } from './account.guard';

describe('AccountGuard', () => {
  it('should be defined', () => {
    expect(new AccountGuard(new LoggerService())).toBeDefined();
  });
});
