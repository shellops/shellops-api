import { Injectable, OnModuleInit } from '@nestjs/common';
import { classToPlain, ClassTransformOptions, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { ConfigDto } from './config.dto';

@Injectable()
export class ConfigService implements OnModuleInit {

    #config: ConfigDto;

    private configPath = path.join(os.homedir(), '.shellops.json');

    private transformOpts: ClassTransformOptions = {
        enableCircularCheck: true,
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        strategy: 'exposeAll',
    }

    get config() {
        return this.#config;
    }

    set config(value: ConfigDto) {
        this.#config = value;
        this.saveConfig(value);
    }

    constructor() {
        this.#config = this.loadConfig();
    }

    async onModuleInit() {
        await validateOrReject(this.config);
    }

    public saveConfig(value: ConfigDto): void {
        fs.writeJSONSync(this.configPath, classToPlain(value, this.transformOpts))
    }

    public loadConfig(): ConfigDto {

        // create local config if not exists
        if (!fs.existsSync(this.configPath)) {

            const configDto = new ConfigDto();
            fs.writeJSONSync(this.configPath, classToPlain(configDto, this.transformOpts));

        } else {

            const configJson = fs.readJsonSync(this.configPath);
            const configDto = plainToClass(ConfigDto, configJson, this.transformOpts);
            return configDto;

        }
    }


}
