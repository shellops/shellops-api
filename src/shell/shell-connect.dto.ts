import { IsNumber, IsOptional, IsString } from "class-validator"

export class ShellConfigDto {

    index?: number;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    username: string = "root";

    @IsString()
    host: string;

    @IsNumber()
    @IsOptional()
    port: number = 22;

}