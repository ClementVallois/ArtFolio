import { Module } from '@nestjs/common';
import { SharedArtistUseCaseProxy } from './proxies/sharedArtistUseCase.proxy';
import { GetAllPostsUseCase } from '../post/use-cases/getAllPosts.useCase';
import { GetArtistPinnedPostUseCase } from '../post/use-cases/getArtistPinnedPost.useCase';
import { GetAllArtistPostsUseCase } from '../post/use-cases/getAllArtistPosts.useCase';
import { GetOneArtistPostUseCase } from '../post/use-cases/getOneArtistPost.useCase';
import { CreatePostUseCase } from '../post/use-cases/createPost.useCase';
import { AssetService } from 'src/application/services/asset.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/application/services/category.service';
import { Category } from 'src/domain/entities/category.entity';
import { GetLastRegisteredArtistsPostsUseCase } from 'src/application/modules/artist/use-cases/getLastRegisteredArtistsPosts.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Asset, Category])],
  providers: [
    FileService,
    AssetService,
    CategoryService,
    SharedArtistUseCaseProxy,
    GetAllPostsUseCase,
    GetLastRegisteredArtistsPostsUseCase,
    GetArtistPinnedPostUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
    CreatePostUseCase,
  ],
  exports: [
    SharedArtistUseCaseProxy,
    GetAllPostsUseCase,
    GetLastRegisteredArtistsPostsUseCase,
    GetArtistPinnedPostUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
    CreatePostUseCase,
  ],
})
export class SharedArtistModule {}
