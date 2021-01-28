import { Controller, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AppTemplate } from './app-template.dto';
import { StoreService } from './store.service';

@Controller()
@ApiTags('Store')
export class StoreController {

    constructor(private readonly storeService: StoreService) { }


    @Get('/api/v1/store/app-templates')
    @ApiBody({ type: AppTemplate, isArray: true })
    getAppTemplates() {

        return this.storeService.getAppTemplates();

    }

}
