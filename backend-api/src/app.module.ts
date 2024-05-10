import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './infrastructure/services/jwt/jwt.module';
import { UserModule } from './presentation/user/user.module';
import { PostModule } from './presentation/post/post.module';
import { DatabaseModule } from './infrastructure/database/datasource.module';
import { AssetModule } from './presentation/asset/asset.module';
import { CategoryModule } from './presentation/category/category.module';
import { configValidationSchema } from './infrastructure/config/env-config.validation';
import { DataRequestModule } from './presentation/data-request/data-request.module';
import { EnvConfigModule } from './infrastructure/config/env-config.module';
import { SeederModule } from './infrastructure/services/faker/seeder/seeder.module';
import { ArtistModule } from './presentation/artist/artist.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { SeederService } from './infrastructure/services/faker/seeder/seeder.service';

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
    ArtistModule,
    PostModule,
    DatabaseModule,
    DataRequestModule,
    EnvConfigModule,
    SeederModule,
    FastifyMulterModule,
  ],
  controllers: [],
  providers: [SeederService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly seederService: SeederService,
  ) { }

  async onModuleInit(): Promise<void> {
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
    // Uncomment to seed fake data
    await this.seederService.seedAll();

    //Uncomment to clear fake data
    // await this.seederService.clearAll();
  }
}

