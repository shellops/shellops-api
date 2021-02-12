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
export class ApiGuard implements CanActivate {
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

  private reject(res: Response) {
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
