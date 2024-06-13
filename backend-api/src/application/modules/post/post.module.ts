import { Module } from '@nestjs/common';
import { PostController } from 'src/presentation/controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from 'src/application/services/asset.service';
import { GetPostByIdUseCase } from 'src/application/modules/post/use-cases/getPostById.useCase';
import { RemovePostUseCase } from 'src/application/modules/post/use-cases/removePost.useCase';
import { UpdatePostUseCase } from 'src/application/modules/post/use-cases/updatePost.useCase';
import { PostUseCaseProxy } from 'src/application/modules/post/proxies/postUseCase.proxy';
import { SharedPostModule } from 'src/application/shared/modules/post/shared-post.module';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { GetPostAssetsUseCase } from '../asset/use-cases/getPostAssets.useCase';
import { PostRepository } from 'src/infrastructure/repositories/post.repository';
import { GetPostPictureAssetsUseCase } from '../asset/use-cases/getPostPictureAssets.useCase';
import { GetArtistPostPictureAssetsUseCase } from '../asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetUserProfilePictureAssetUseCase } from '../asset/use-cases/getUserProfilePictureAsset.useCase';
import { PostPictureService } from 'src/infrastructure/services/file/post-picture.service';
import { GetArtistByIdUseCase } from '../artist/use-cases/getArtistById.useCase';
import { CreateAssetUseCase } from '../asset/use-cases/createAsset.useCase';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';
import { RemoveAssetUseCase } from '../asset/use-cases/removeAsset.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Asset, User]), SharedPostModule],
  controllers: [PostController],
  providers: [
    { provide: 'IAssetRepository', useClass: AssetRepository },
    { provide: 'IPostRepository', useClass: PostRepository },
    { provide: 'IArtistRepository', useClass: ArtistRepository },
    FileService,
    AssetService,
    PostPictureHandler,
    PostUseCaseProxy,
    GetPostByIdUseCase,
    RemovePostUseCase,
    UpdatePostUseCase,
    RemoveAssetUseCase,
    GetPostPictureAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    GetUserProfilePictureAssetUseCase,
    PostPictureService,
    GetArtistByIdUseCase,
    CreateAssetUseCase,
    GetPostAssetsUseCase,
  ],
  exports: [],
})
export class PostModule {}
