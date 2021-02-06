import { Controller, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AppTemplate } from './app-template.dto';
import { StoreService } from './store.service';

@Controller('v1/store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('app-templates')
  @ApiBody({ type: AppTemplate, isArray: true })
  getAppTemplates() {
    return this.storeService.getAppTemplates();
  }
}
