import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { AuthService } from './auth/auth.service';

@Module({
  providers: [DatabaseService, AuthService],
})
export class FirebaseModule {}
