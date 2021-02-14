#!/usr/bin/env node
import * as chalk from 'chalk';
import * as getPort from 'get-port';

import { bootstrap } from './bootstrap';
import { Config } from './config';
import { LoggerService } from './database/logger.service';
import { ENV } from './env.enum';
import { SysinfoService } from './sysinfo/sysinfo.service';


(async () => {

    Config.env = process.env['ENV'] = ENV.PRODUCTION;

    Config.mode = 'AGENT';

    const sys = await new SysinfoService().general();

    if (!sys.os.distro.toLowerCase().includes('ubuntu'))
        throw new Error(chalk.red(`\n\nWe are only supporting Ubuntu servers for now, please stay tuned for next version.`))



    await bootstrap();

})().catch((e) => {
    new LoggerService().verbose(chalk.red('\n\n' + e.message + '\n\n'));
})