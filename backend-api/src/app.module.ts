import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { SearchModule } from './application/search/search.module';
import { UserModule } from './application/user/user.module';
import { PostModule } from './application/post/post.module';
import { PortfolioModule } from './application/portfolio/portfolio.module';

@Module({
  imports: [AuthModule, SearchModule, UserModule, PostModule, PortfolioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
