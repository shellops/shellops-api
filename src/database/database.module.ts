import { Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { LoggerService } from './logger.service';

@Module({
  providers: [DatabaseService, LoggerService],
  exports: [DatabaseService, LoggerService],
})
export class DatabaseModule {}
