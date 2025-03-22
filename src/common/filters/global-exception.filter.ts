import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

/**
 * Interface für eine standardisierte Fehlerantwort.
 */
interface ErrorDetails {
  message?: string;
  [key: string]: any; // Erlaubt zusätzliche Fehlerdetails
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Ein unerwarteter Fehler ist aufgetreten.';
    let errorDetails: ErrorDetails | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (
        typeof errorResponse === 'object' &&
        errorResponse !== null &&
        'message' in errorResponse
      ) {
        message = (errorResponse as { message?: string }).message || message;
        errorDetails = errorResponse as ErrorDetails;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Logging des Fehlers mit Stacktrace (falls verfügbar)
    this.logger.error(
      `🚨 Fehler auf ${request.method} ${request.url}: ${message}`,
      (exception as Error)?.stack,
    );

    // Sichere Zuweisung von Status und Fehlerdetails
    const safeStatus: number =
      typeof status === 'number' ? status : HttpStatus.INTERNAL_SERVER_ERROR;
    const safeErrorDetails: ErrorDetails = errorDetails ?? {};

    response.status(safeStatus).json({
      statusCode: safeStatus,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      error: message,
      details: safeErrorDetails, // Enthält zusätzliche Details, falls vorhanden
    });
  }
}
