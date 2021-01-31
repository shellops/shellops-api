import {
  CanActivate,
  ExecutionContext,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from './authenticated-request.interface';

import { Config } from './config';
import { ENV } from './env.enum';

/**
 * Validates access to premium and account API's
 */
@Injectable()
export class AccountGuard implements CanActivate, OnModuleInit {
  firebaseApp: any;
  onModuleInit() {
    if (Config.env === ENV.TEST) return;
    this.firebaseApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(Config.firebase),
    });
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
