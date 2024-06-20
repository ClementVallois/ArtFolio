import { Module } from '@nestjs/common';
import { PostController } from 'src/presentation/controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { GetPostByIdUseCase } from 'src/application/modules/post/use-cases/getPostById.useCase';
import { RemovePostUseCase } from 'src/application/modules/post/use-cases/removePost.useCase';
import { UpdatePostUseCase } from 'src/application/modules/post/use-cases/updatePost.useCase';
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
import { Logger } from 'src/infrastructure/logger/logger.service';
import { LogConfigService } from 'config/log-config.service';
import { LogFileService } from 'src/infrastructure/logger/log-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Asset, User]), SharedPostModule],
  controllers: [PostController],
  providers: [
    { provide: 'IAssetRepository', useClass: AssetRepository },
    { provide: 'IPostRepository', useClass: PostRepository },
    { provide: 'IArtistRepository', useClass: ArtistRepository },
    PostPictureHandler,
    GetPostByIdUseCase,
    RemovePostUseCase,
    UpdatePostUseCase,
    RemoveAssetUseCase,
    Logger,
    LogConfigService,
    LogFileService,
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
