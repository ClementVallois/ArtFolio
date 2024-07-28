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
import { ConfigService } from '@nestjs/config';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Logging Config
  const logConfigService = app.get(LogConfigService);
  const logFileService = app.get(LogFileService);
  const logFormatterService = app.get(LogFormatterService);
  const configService = app.get(ConfigService);
  const logger = new Logger(
    logConfigService,
    logFileService,
    logFormatterService,
    configService,
  );

  // Helmet
  await app.register(helmet, { global: true });

  // CSRF
  const sessionSecret = configService.get<string>('SESSION_SECRET');

  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: sessionSecret,
    cookie: {
      secure: false, // TODO: Change to true in production
      httpOnly: true,
      sameSite: 'lax',
    },
  });
  await app.register(fastifyCsrf);

  // Logging
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  // CORS
  app.enableCors();

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: 422,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    }),
  );

  // Redirect root to /api
  app
    .getHttpAdapter()
    .getInstance()
    .get('/', (req, reply) => {
      reply.redirect('/api');
    });

  // Swagger
  const swaggerConfig = app.get<ISwaggerConfig>('SWAGGER_CONFIG');
  swaggerConfig.setup(app);

  await app.listen(3000, '0.0.0.0');
  const appUrl = await app.getUrl();
  await logger.info(`Application is running on: ${appUrl}`, LogLevel.INFO);
}
bootstrap();
