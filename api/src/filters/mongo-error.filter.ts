import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'node_modules/mongodb';
import { IExceptionResponse } from './exception.interface';
@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const request = host.switchToHttp().getRequest();
        let message = 'Internal server error.';
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception.code === 11000) {
            status = HttpStatus.BAD_REQUEST;
            message = `Wallet already exists`;
        }
        
        let respObj: IExceptionResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: message,
            errors: exception.keyValue,
            path: request.url
        }
        response
            .status(status)
            .json(respObj);
    }
}