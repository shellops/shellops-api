import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import { randomBytes } from 'crypto';

import { Config } from '../config';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../database/logger.service';
import { ENV } from '../env.enum';
import { SysinfoService } from '../sysinfo/sysinfo.service';

@Injectable()
export class AppService {

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly sysInfoService: SysinfoService,
        private readonly loggerService: LoggerService,
    ) { }

    public async getCredentials() {
        return this.databaseService.get<{
            user: string;
            pass: string;
        }>('agent-auth');
    }


    async onApplicationBootstrap() {
        let auth = await this.getCredentials();

        const publicIp = await this.sysInfoService.ip();

        if (!auth) {
            auth = {
                user: randomBytes(6).toString('hex'),
                pass: randomBytes(24).toString('hex'),
            };
            await this.databaseService.update('agent-auth', auth);
        }

        this.loggerService.verbose(
            chalk.bold.greenBright
                .bgBlack`\n\nUse following url to add your host on shellops.io/panel\n\n\t` +
            chalk.underline
                .yellow`http://${auth.user}:${auth.pass}@${publicIp.replace(/\./g, '-')}.ip.shellops.link\n` +
            (Config.env === ENV.DEVELOPMENT
                ? `\n\t\tOR\n\n` +
                chalk.underline
                    .yellow`\thttp://${auth.user}:${auth.pass}@localhost:${Config.port}\n`
                : '') +
            chalk.bgBlack.greenBright`\n\tAGENT ID: ` +
            chalk.yellow`${auth.user}` +
            chalk.bgBlack.greenBright`\n\tAGENT SECRET: ` +
            chalk.yellow`${auth.pass}` ,
        );
    }



}
