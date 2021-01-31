import { CanActivate, ExecutionContext, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import * as chalk from 'chalk';
import * as firebaseAdmin from 'firebase-admin';

import { AuthenticatedRequest } from './authenticated-request.interface';
import { Config } from './config';
import { LoggerService } from './database/logger.service';
import { ENV } from './env.enum';

/**
 * Validates access to premium and account API's
 */
@Injectable()
export class AccountGuard implements CanActivate, OnModuleInit {
  firebaseApp: any;

  constructor(private readonly loggerService: LoggerService) {}
  onModuleInit() {
    if (Config.env === ENV.TEST) return;

    if (Config.firebase.clientEmail && Config.firebase.privateKey)
      this.firebaseApp = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(Config.firebase),
      });
    else this.loggerService.warn(chalk.redBright`Firebase credentials were not provided`);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: AuthenticatedRequest = context.switchToHttp().getRequest();

    const tokenType = req.headers?.authorization?.split(' ')[0];

    const token =
      tokenType?.toLowerCase() === 'bearer' &&
      req.headers?.authorization?.split(' ')[1];

    try {
      req.user = await firebaseAdmin.auth().verifyIdToken(token);

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
