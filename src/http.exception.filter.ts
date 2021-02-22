import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as cleanStack from 'clean-stack';
import { Response } from 'express';
import * as _ from 'lodash';
import * as requestIp from 'request-ip';

import { LoggerService } from './database/logger.service';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {


  constructor(
    private readonly logger: LoggerService
  ) { }

  async catch(exception: any, host: ArgumentsHost) {

    if (exception[0] instanceof ValidationError) {
      exception = new ValidationPipe().createExceptionFactory()(exception);
    }

    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request = ctx.getRequest();

    request.xip = requestIp.getClientIp(request);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const traces = cleanStack(exception.stack || '', {
      pretty: true,
      basePath: process.cwd()
    })
      .split('\n')
      .map(p => p
        .replace('(/src', '(src')
        .replace('    at ', ''));

    const errorModel = {
      statusCode: status,
      method: request.method,
      message: exception.response?.message || exception?.message,
      details: exception.response?.error,
      timestamp: Date.now(),
      path: request.url,
      ip: request.xip,
      geo: _.pick(request.user?.geo, 'ip', 'country_name', 'city'),
      traceId: request.traceId,
      trace: traces,
      payload: request.body,
      user: request.user,
    };

    const responseTime = Date.now() - request.start;
    const logMessage =
      `${request.xip} | ${request.user?.email || 'N/A'} [${request.method}] ${request.url} ${status || ''} ${responseTime ? responseTime + ' ms' : ''} ${errorModel.message || ''}`;

    this.logger.error(logMessage, traces.join('\n\t'));

    response
      .status(errorModel.statusCode)
      .json(errorModel)
      .end();
  }
}
