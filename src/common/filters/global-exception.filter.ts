import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'An unexpected error occurred.';

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      message = 'Invalid input data.';
    } else if (exception instanceof NotFoundException) {
      status = exception.getStatus();
      message = 'The requested resource was not found.';
    } else if (exception instanceof UnauthorizedException) {
      status = exception.getStatus();
      message = 'You are not authorized to access this resource.';
    } else if (exception instanceof ForbiddenException) {
      status = exception.getStatus();
      message = 'Access to this resource is forbidden.';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
