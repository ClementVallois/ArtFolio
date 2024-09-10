import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { CreatePostUseCase } from './use-cases/createPost.useCase';
import { GetAllPostsUseCase } from './use-cases/getAllPosts.useCase';
import { GetArtistPinnedPostUseCase } from './use-cases/getArtistPinnedPost.useCase';
import { GetAllArtistPostsUseCase } from './use-cases/getAllArtistPosts.useCase';
import { GetOneArtistPostUseCase } from './use-cases/getOneArtistPost.useCase';
import { PostRepository } from 'src/infrastructure/repositories/post.repository';
import { SharedArtistModule } from '../artist/shared-artist.module';
import { CommonModule } from 'src/application/common/common.module';
import { GetPostByIdUseCase } from 'src/application/modules/post/use-cases/getPostById.useCase';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    SharedArtistModule,
    forwardRef(() => CommonModule),
  ],
  providers: [
    {
      provide: 'IPostRepository',
      useClass: PostRepository,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    CreatePostUseCase,
    GetPostByIdUseCase,
    GetAllPostsUseCase,
    GetArtistPinnedPostUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
  ],
  exports: [
    CreatePostUseCase,
    GetPostByIdUseCase,
    GetAllPostsUseCase,
    GetArtistPinnedPostUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
  ],
})
export class SharedPostModule {}
