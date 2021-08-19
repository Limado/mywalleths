
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { IExceptionResponse } from './exception.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = typeof exception.getResponse() == 'object' ? JSON.stringify(exception.getResponse()) : exception.getResponse().toString();
    
    let respObj: IExceptionResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
      path: request.url,
    }

    response
      .status(status)
      .json(respObj);
  }
}