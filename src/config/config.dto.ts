import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from "class-validator";
import { ENV } from "../env.enum";
import { ShellConfigDto } from "../shell/shell-connect.dto";

export class ConfigDto {

    @IsEnum(ENV)
    env: ENV = process.env.NODE_ENV as ENV || ENV.DEVELOPMENT;

    @Type(() => ShellConfigDto)
    @IsObject({ each: true })
    nodes: ShellConfigDto[] = [];

    @IsNumber()
    port = Number(process.env.PORT || 3000);

    @IsString()
    host = process.env.HOST || '127.0.0.1'
}