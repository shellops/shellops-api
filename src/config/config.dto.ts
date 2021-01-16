import { Type } from "class-transformer";
import { IsArray, IsObject } from "class-validator";
import { ShellConfigDto } from "../shell/shell-connect.dto";

export class ConfigDto {

    @Type(() => ShellConfigDto)
    @IsObject({ each: true })
    connections: ShellConfigDto[] = [];

}