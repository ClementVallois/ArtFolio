import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { UserModule } from './application/user/user.module';
import { PostModule } from './application/post/post.module';
import { DatabaseModule } from './infrastructure/database/datasource.module';
import { AssetModule } from './application/asset/asset.module';
import { CategoryModule } from './application/category/category.module';
import { configValidationSchema } from './infrastructure/config/env-config.validation';
import { DataRequestModule } from './application/data-request/data-request.module';
import { EnvConfigModule } from './infrastructure/config/env-config.module';

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

    AssetModule,
    AuthModule,
    CategoryModule,
    UserModule,
    PostModule,
    DatabaseModule,
    DataRequestModule,
    EnvConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    if (this.configService.get<string>('DB_ENV').toLowerCase() === 'dev') {
      console.log('Env file is configured for development database');
    } else if (
      this.configService.get<string>('DB_ENV').toLowerCase() === 'prod'
    ) {
      console.log('Env file is configured for production database');
    }
    if (
      this.configService.get<string>('NODE_ENV').toLowerCase() === 'development'
    ) {
      console.log('Env file is configured for development environment');
    } else if (
      this.configService.get<string>('NODE_ENV').toLowerCase() === 'production'
    ) {
      console.log('Env file is configured for production environment');
    }
  }
}
