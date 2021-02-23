#!/usr/bin/env node
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import fetch from 'node-fetch';
import * as open from 'open';
import { join } from 'path';
import * as unzipper from 'unzipper';

import { AppService } from './app/app.service';
import { app, bootstrap } from './bootstrap';
import { Config } from './config';
import { LoggerService } from './database/logger.service';
import { ENV } from './env.enum';
import { SysinfoService } from './sysinfo/sysinfo.service';

(async () => {

    const logger = new LoggerService();

    if (!process.env['NODE_ENV'])
        Config.env = process.env['NODE_ENV'] = ENV.PRODUCTION;

    Config.mode = 'PANEL';

    const panelZipPath = join(__dirname, '../panel.zip');
    const panelPath = join(__dirname, '../panel');
    const publicPath = join(__dirname, '../public');

    fs.ensureDirSync(panelPath);
    fs.ensureDirSync(publicPath);

    if (!fs.existsSync(panelZipPath)) {

        logger.verbose(chalk.cyanBright(`Downloading Panel ...`));

        const res = await fetch("https://github.com/shellops/shellops-panel/releases/latest/download/panel.zip");
        const file = fs.createWriteStream(panelZipPath);
        await new Promise((resolve, reject) => {

            res.body.pipe(file);
            res.body.on("error", reject);
            file.on("finish", resolve);
        });

        logger.verbose(chalk.cyanBright(`Download Done !`));
    }


    if (!fs.existsSync(join(publicPath, 'index.html'))) {
        await new Promise((resolve, reject) => {

            fs.emptyDirSync(publicPath);

            logger.verbose(chalk.cyanBright(`Unziping panel.zip ...`));

            const unzip = unzipper.Extract({ path: panelPath });

            const reader = fs.createReadStream(panelZipPath);

            reader.on('end', resolve)

            reader.on('error', reject)
            unzip.on('error', reject);

            reader.pipe(unzip);
        });

        await fs.move(join(panelPath, 'out'), publicPath, { overwrite: true });
        await fs.emptyDir(panelPath);
        await fs.rmdir(panelPath);

        logger.verbose(chalk.cyanBright(`Unzip Done !`));

    }

    await bootstrap();

    const appService = app.get<AppService>(AppService);

    const auth = await appService.getCredentials();

    const localToken = Buffer.from(`http://${auth.user}:${auth.pass}@localhost:${Config.port}`).toString('base64');

    const url = `http://localhost:${Config.port}/machines/add?local=${encodeURIComponent(localToken)}`;

    if (Config.env === ENV.PRODUCTION)
        open(url);

    logger.verbose(chalk.cyanBright('\nLOCAL PANEL:\n' + url + '\n\n'));

})().catch((e) => {
    new LoggerService().verbose(chalk.red('\n\n' + e.message + '\n\n'));
})