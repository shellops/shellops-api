#!/usr/bin/env node

import { Logger } from "@nestjs/common";
import * as chalk from "chalk";
import * as getPort from "get-port";
import { bootstrap } from "./bootstrap";
import { LoggerService } from "./database/logger.service";

(async () => {

    process.env['ENV'] = 'production';

    if (await getPort({ port: 80 }) !== 80) {
        throw new Error('Please run as root user or use sudo, otherwise freeup port 80, Shellops Agent needs it to bind domains and create SSL certificates.')
    }

    await bootstrap();

})().catch((e) => {
    new LoggerService().verbose(chalk.red('\n\n' + e.message + '\n\n'));
})