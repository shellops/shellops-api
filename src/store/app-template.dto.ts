import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class AppTemplate {

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  dockerfile?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty()
  @Expose()
  @IsArray()
  @IsOptional()
  screenshots?: { url: string; label: string; description: string }[];

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  github?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  docs?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  version?: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  revision?: number;

  @ApiProperty()
  @Expose()
  @IsArray()
  @IsOptional()
  @Type(() => AppMount)
  mounts?: AppMount[];

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  @Type(() => AppPort)
  webPort?: string;

  @ApiProperty()
  @Expose()
  @IsArray()
  @IsOptional()
  @Type(() => AppPort)
  ports: AppPort[];

  @ApiProperty()
  @Expose()
  @IsArray()
  @IsOptional()
  @Type(() => AppTemplate)
  dependencies?: AppTemplate[];

  @ApiProperty()
  @Expose()
  @IsArray()
  @IsOptional()
  @Type(() => AppVariable)
  variables?: AppVariable[];
}

export class AppVariable {

  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @Expose()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @Expose()
  value: string;
}
export class AppPort {

  @ApiProperty()
  @IsString()
  @Expose()
  @IsOptional()
  @IsEnum(['tcp', 'udp'])
  type?: 'tcp' | 'udp';

  @ApiProperty()
  @IsString()
  @Expose()
  host: string;

  @ApiProperty()
  @IsString()
  @Expose()
  container: string;

}

export class AppMount {

  @ApiProperty()
  @IsNumber()
  @Expose()
  host: string;

  @ApiProperty()
  @IsString()
  @Expose()
  container: string;

}
