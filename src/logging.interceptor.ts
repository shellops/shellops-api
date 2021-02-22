import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import * as requestIp from 'request-ip';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 } from 'uuid';

import { LoggerService } from './database/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {


  constructor(
    private readonly logger: LoggerService
  ) { }


  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    const ctx = context.switchToHttp();

    ctx.getRequest().traceId = v4();

    const { statusCode, statusMessage, }: Response = ctx.getResponse();

    const request = ctx.getRequest();
    const { user, method, url, } = request;

    request.xip = requestIp.getClientIp(request);
    request.start = Date.now();


    return next
      .handle()
      .pipe(
        tap(() => {
          const responseTime = Date.now() - request.start;
          const logMessage =
            `${request.xip} | ${user?.email || 'N/A'} [${method}] ${url} ${statusCode || ''} ${responseTime}ms ${statusMessage || ''}`;

          this.logger.verbose(logMessage);
        })
      );
  }
}
