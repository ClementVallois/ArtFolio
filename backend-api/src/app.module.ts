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
import { PostSeederService } from './infrastructure/services/faker/seeder/post.seeder.service';
import { UserSeederService } from './infrastructure/services/faker/seeder/user.seeder.service';
import { AssetSeederService } from './infrastructure/services/faker/seeder/asset.seeder.service';
import { DataRequestSeederService } from './infrastructure/services/faker/seeder/data-request.seeder.service';
import { CategorySeederService } from './infrastructure/services/faker/seeder/category.seeder.service';
import { ArtistModule } from './presentation/artist/artist.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly userSeederService: UserSeederService,
    private readonly assetSeederService: AssetSeederService,
    private readonly dataRequestSeederService: DataRequestSeederService,
    private readonly postSeederService: PostSeederService,
    private readonly categorySeederService: CategorySeederService,
  ) {}

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

    // await this.userSeederService.seed();
    // await this.postSeederService.seed();
    // await this.assetSeederService.seed();
    // await this.dataRequestSeederService.seed();
    // await this.categorySeederService.seed();
  }
}
