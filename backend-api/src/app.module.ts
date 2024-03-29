import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { SearchModule } from './application/search/search.module';
import { UserModule } from './application/user/user.module';
import { PostModule } from './application/post/post.module';
import { PortfolioModule } from './application/portfolio/portfolio.module';
import { DatabaseModule } from './infrastructure/database/datasource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    SearchModule,
    UserModule,
    PostModule,
    PortfolioModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
