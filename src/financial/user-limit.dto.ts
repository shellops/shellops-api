import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserLimitDto {
  constructor(model: UserLimitDto) {
    Object.assign(this, model);
  }
  @ApiProperty()
  @IsNumber()
  @Expose()
  hostCount: number;
}
