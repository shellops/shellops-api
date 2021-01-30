import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AppTemplate } from './app-template.dto';

@Injectable()
export class StoreService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAppTemplates(): Promise<AppTemplate[]> {
    return this.databaseService.get<AppTemplate[]>('store/app-templates');
  }
}
