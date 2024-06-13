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
import { GetAmateurByIdUseCase } from 'src/application/modules/amateur/use-cases/getAmateurById.useCase';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { GetArtistByIdUseCase } from 'src/application/modules/artist/use-cases/getArtistById.useCase';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';
import { PostRepository } from 'src/infrastructure/repositories/post.repository';
import { GetPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getPostPictureAssets.useCase';
import { GetArtistPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetUserProfilePictureAssetUseCase } from 'src/application/modules/asset/use-cases/getUserProfilePictureAsset.useCase';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';
import { PostPictureService } from 'src/infrastructure/services/file/post-picture.service';
import { CreateAssetUseCase } from 'src/application/modules/asset/use-cases/createAsset.useCase';
import { GetPostByIdUseCase } from 'src/application/modules/post/use-cases/getPostById.useCase';
import { RemoveAssetUseCase } from 'src/application/modules/asset/use-cases/removeAsset.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Asset])],
  providers: [
    {
      provide: 'IAmateurRepository',
      useClass: AmateurRepository,
    },
    {
      provide: 'IArtistRepository',
      useClass: ArtistRepository,
    },
    {
      provide: 'IPostRepository',
      useClass: PostRepository,
    },
    {
      provide: 'IAssetRepository',
      useClass: AssetRepository,
    },
    FileService,
    AssetService,
    PostPictureHandler,
    PostPictureService,
    CreateAssetUseCase,
    GetPostByIdUseCase,
    SharedPostUseCaseProxy,
    CreatePostUseCase,
    GetAllPostsUseCase,
    RemoveAssetUseCase,
    RemoveAssetUseCase,
    GetArtistPinnedPostUseCase,
    GetPostPictureAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    GetUserProfilePictureAssetUseCase,
    GetArtistByIdUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
    CreatePostUseCase,
    GetAmateurByIdUseCase,
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
