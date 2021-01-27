import { Module } from '@nestjs/common';
import { StoreService } from './store.service';

@Module({
  providers: [StoreService],
})
export class StoreModule {}
