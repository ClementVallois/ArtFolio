import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../services/logger.service';
import { LogLevel } from '../log-level.enum';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const responseTime = Date.now() - now;
          this.logger.info(
            `[${method}] ${url} ${responseTime}ms`,
            LogLevel.INFO,
          );
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          const errorMessage = this.extractErrorMessage(error);
          this.logger.error(
            `[${method}] ${url} ${responseTime}ms - Error: ${errorMessage}`,
            error,
            LogLevel.ERROR,
          );
        },
      }),
    );
  }

  private extractErrorMessage(error: any): string {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'Unknown error';
    }
  }
}
