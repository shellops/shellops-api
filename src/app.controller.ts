import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {
  @Get('/api')
  @ApiOperation({ summary: 'Redirect to swagger' })
  redirectToSwagger(@Res() res: Response) {
    res.redirect('/swagger');
  }
}
