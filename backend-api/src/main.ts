import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ISwaggerConfig } from './presentation/swagger/swagger.module';
import { LogFileService } from './infrastructure/logger/services/log-file.service';
import { Logger } from './infrastructure/logger/services/logger.service';
import { LoggingInterceptor } from './infrastructure/logger/interceptors/logger.interceptor';
import { LogConfigService } from './infrastructure/logger/services/log-config.service';
import { LogFormatterService } from './infrastructure/logger/services/log-formatter.service';
import { LogLevel } from './infrastructure/logger/log-level.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const logConfigService = app.get(LogConfigService);
  const logFileService = app.get(LogFileService);
  const logFormatterService = app.get(LogFormatterService);
  const logger = new Logger(
    logConfigService,
    logFileService,
    logFormatterService,
  );
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: 422,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    }),
  );

  const swaggerConfig = app.get<ISwaggerConfig>('SWAGGER_CONFIG');
  swaggerConfig.setup(app);

  await app.listen(3000, '0.0.0.0');
  const appUrl = await app.getUrl();
  await logger.info(`Application is running on: ${appUrl}`, LogLevel.INFO);
}
bootstrap();
