import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [DatabaseModule],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
