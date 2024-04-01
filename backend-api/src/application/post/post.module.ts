import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from '../../infrastructure/controllers/post/post.controller';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
