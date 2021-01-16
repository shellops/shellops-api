import { Type } from "class-transformer";
import { IsArray, IsObject } from "class-validator";
import { ShellConnectDto } from "../shell/shell-connect.dto";

export class ConfigDto {

    @Type(() => ShellConnectDto)
    @IsObject({ each: true })
    connections: ShellConnectDto[] = [];

}