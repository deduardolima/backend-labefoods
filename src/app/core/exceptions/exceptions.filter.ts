import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': // unique constraint violation
          message = 'Unique constraint violation';
          status = HttpStatus.BAD_REQUEST;
          break;
        case 'P2025': // record not found
          message = 'Record not found';
          status = HttpStatus.NOT_FOUND;
          break;
        default:
          message = exception.message;
          status = HttpStatus.BAD_REQUEST;
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}