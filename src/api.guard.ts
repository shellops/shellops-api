import {
  CanActivate,
  ExecutionContext,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as chalk from 'chalk';
import { randomBytes } from 'crypto';
import { Observable } from 'rxjs';

import { AuthenticatedRequest } from './authenticated-request.interface';
import { Config } from './config';
import { DatabaseService } from './database/database.service';
import { LoggerService } from './database/logger.service';
import { ENV } from './env.enum';
import { SysinfoService } from './sysinfo/sysinfo.service';
import * as basicAuth from 'basic-auth';
import { Response } from 'express';
import { toUpper } from 'lodash';
/**
 * Validates access from panel to remote nodes
 */
@Injectable()
export class ApiGuard implements CanActivate, OnApplicationBootstrap {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly sysInfoService: SysinfoService,
    private readonly loggerService: LoggerService,
  ) {}

  private async getCredentials() {
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
          .yellow`http://${auth.user}:${auth.pass}@${publicIp}:${Config.port}\n` +
        (Config.env === ENV.DEVELOPMENT
          ? `\n\t\tOR\n\n` +
            chalk.underline
              .yellow`\thttp://${auth.user}:${auth.pass}@localhost:${Config.port}\n`
          : '') +
          chalk.bgBlack.greenBright`\n\tUSER: ` +
          chalk.yellow`${auth.user}` +
          chalk.bgBlack.greenBright`\n\tPASS: ` +
          chalk.yellow`${auth.pass}` ,
    );
  }

  reject(res: Response) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: AuthenticatedRequest = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const credentials = await this.getCredentials();
    const { name, pass } = basicAuth(req) || {};

    if (name !== credentials.user || pass !== credentials.pass)
      this.reject(res);

    return true;
  }
}
