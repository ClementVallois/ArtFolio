import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from 'src/presentation/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
