import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { SharedPostUseCaseProxy } from './proxies/sharedPostUseCase.proxy';
import { CreatePostUseCase } from './use-cases/createPost.useCase';
import { GetAllPostsUseCase } from './use-cases/getAllPosts.useCase';
import { GetArtistPinnedPostUseCase } from './use-cases/getArtistPinnedPost.useCase';
import { GetAllArtistPostsUseCase } from './use-cases/getAllArtistPosts.useCase';
import { GetOneArtistPostUseCase } from './use-cases/getOneArtistPost.useCase';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { Asset } from 'src/domain/entities/asset.entity';
import { AssetService } from 'src/application/services/asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Asset])],
  providers: [
    FileService,
    AssetService,
    SharedPostUseCaseProxy,
    CreatePostUseCase,
    GetAllPostsUseCase,
    GetArtistPinnedPostUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
    CreatePostUseCase,
  ],
  exports: [
    SharedPostUseCaseProxy,
    CreatePostUseCase,
    GetAllPostsUseCase,
    GetArtistPinnedPostUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
    CreatePostUseCase,
  ],
})
export class SharedPostModule {}
