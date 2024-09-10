import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './infrastructure/security/jwt.module';
import { UserModule } from './application/modules/user/user.module';
import { PostModule } from './application/modules/post/post.module';
import { DatabaseModule } from './infrastructure/database/datasource.module';
import { AssetModule } from './application/modules/asset/asset.module';
import { CategoryModule } from './application/modules/category/category.module';
import { configValidationSchema } from './infrastructure/config/env-config.validation';
import { EnvConfigModule } from './infrastructure/config/env-config.module';
import { SeederModule } from './infrastructure/services/faker/seeder/seeder.module';
import { ArtistModule } from './application/modules/artist/artist.module';
import { SeederService } from './infrastructure/services/faker/seeder/seeder.service';
import { PersonalDataRequestModule } from './application/modules/personal-data-request/personal-data-request.module';
import { AmateurModule } from './application/modules/amateur/amateur.module';
import { SwaggerConfigModule } from './presentation/swagger/swagger.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { CommonModule } from './application/common/common.module';
import { Logger } from './infrastructure/logger/services/logger.service';
import { CacheModule } from '@nestjs/cache-manager';
import { SeedCommand } from 'scripts/seed.command';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
      isGlobal: true,
    }),
    CommonModule,
    ThrottlerModule.forRootAsync({
      useFactory: () => [
        {
          ttl: 1000,
          limit: 10000,
        },
      ],
    }),
    AssetModule,
    AuthModule,
    CacheModule.register({ isGlobal: true }),
    CategoryModule,
    UserModule,
    ArtistModule,
    LoggerModule,
    PostModule,
    DatabaseModule,
    AmateurModule,
    PersonalDataRequestModule,
    EnvConfigModule,
    SeederModule,
    SwaggerConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [SeederService, SeedCommand, Logger],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly seederService: SeederService,
    private readonly logger: Logger,
  ) {}

  async onModuleInit(): Promise<void> {
    if (this.configService.get<string>('DB_ENV').toLowerCase() === 'dev') {
      this.logger.info('Env file is configured for development database');
    } else if (
      this.configService.get<string>('DB_ENV').toLowerCase() === 'prod'
    ) {
      this.logger.info('Env file is configured for production database');
    }
    if (
      this.configService.get<string>('NODE_ENV').toLowerCase() === 'development'
    ) {
      this.logger.info('Env file is configured for development environment');
    } else if (
      this.configService.get<string>('NODE_ENV').toLowerCase() === 'production'
    ) {
      this.logger.info('Env file is configured for production environment');
    }
  }
}
