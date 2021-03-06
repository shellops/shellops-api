import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountGuard } from '../account.guard';
import { AuthenticatedRequest } from '../authenticated-request.interface';
import { FinancialService } from './financial.service';
import { UserLimitDto } from './user-limit.dto';

@Controller('v1/financial')
@ApiTags('Financial')
@ApiBearerAuth()
@UseGuards(AccountGuard)
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Get('limits')
  @ApiResponse({ type: UserLimitDto })
  getLimits(@Req() { user: { uid } }: AuthenticatedRequest) {
    return this.financialService.checkUserLimit(uid);
  }
}
