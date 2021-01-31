import { Injectable, OnModuleInit } from '@nestjs/common';

import { Config } from '../config';
import { DatabaseService } from '../database/database.service';
import { AppTemplate } from './app-template.dto';
import * as templates from './templates';

@Injectable()
export class StoreService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    if (Config.mode !== 'API') return;

    for (const name in templates) {
      if (Object.prototype.hasOwnProperty.call(templates, name)) {
        const template = templates[name];
        await this.saveTemplate(template);
      }
    }
  }

  public async saveTemplate(template: AppTemplate): Promise<void> {
    await this.databaseService.update(
      'store/app-templates/' + template.name,
      template,
    );
  }

  public async getAppTemplates(): Promise<AppTemplate[]> {
    return this.databaseService.get<AppTemplate[]>('store/app-templates');
  }
}
