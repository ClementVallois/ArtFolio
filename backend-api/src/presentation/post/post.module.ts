import { Module } from '@nestjs/common';
import { PostService } from '../../application/post/post.service';
import { PostController } from 'src/presentation/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/infrastructure/entities/post.entity';
import { Asset } from 'src/infrastructure/entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Asset])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
