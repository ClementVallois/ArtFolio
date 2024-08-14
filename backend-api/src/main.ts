import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ISwaggerConfig } from './presentation/swagger/swagger.module';
import { Logger } from './infrastructure/logger/services/logger.service';
import { LoggingInterceptor } from './infrastructure/logger/interceptors/logger.interceptor';
import { LogLevel } from './infrastructure/logger/log-level.enum';
import { ConfigService } from '@nestjs/config';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  // Cors
  await app.register(fastifyCors, {
    origin: [
      'https://artfolio.dev',
      'https://www.artfolio.dev',
      'https://admin.artfolio.dev',
      'http://localhost:5174',
      'http://localhost:5180',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Helmet
  await app.register(helmet, {
    global: true,
    frameguard: { action: 'sameorigin' },
    referrerPolicy: { policy: 'same-origin' },
    contentSecurityPolicy: true,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  });

  // Logging Config
  const logger = app.get(Logger);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  await app.register(multipart);

  // CSRF
  const sessionSecret = configService.get<string>('SESSION_SECRET');

  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: sessionSecret,
    cookie: {
      secure: configService.get<string>('NODE_ENV') === 'production',
      httpOnly: true,
      sameSite: 'lax',
    },
  });
  await app.register(fastifyCsrf, {
    cookieOpts: {
      secure: configService.get<string>('NODE_ENV') === 'production',
    },
  });

  // Logging
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
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

  // Start the server
  const port = configService.get<number>('BACKEND_API_SERVER_PORT', 3000);
  await app.listen(port, '0.0.0.0');
  const appUrl = await app.getUrl();
  await logger.info(`Application is running on: ${appUrl}`, LogLevel.INFO);
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
