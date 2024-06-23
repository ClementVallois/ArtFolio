import { Module } from '@nestjs/common';
import { CreateAssetUseCase } from 'src/application/shared/modules/asset/use-cases/createAsset.useCase';
import { GetArtistPostPictureAssetsUseCase } from 'src/application/shared/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetPostAssetsUseCase } from 'src/application/shared/modules/asset/use-cases/getPostAssets.useCase';
import { GetPostPictureAssetsUseCase } from 'src/application/shared/modules/asset/use-cases/getPostPictureAssets.useCase';
import { GetUserProfilePictureAssetUseCase } from 'src/application/shared/modules/asset/use-cases/getUserProfilePictureAsset.useCase';
import { RemoveAssetUseCase } from 'src/application/modules/asset/use-cases/removeAsset.useCase';
import { SaveAssetUseCase } from 'src/application/shared/modules/asset/use-cases/saveAsset.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [],
  providers: [
    { provide: 'IAssetRepository', useClass: AssetRepository },
    GetPostPictureAssetsUseCase,
    GetPostAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    RemoveAssetUseCase,
    GetUserProfilePictureAssetUseCase,
    SaveAssetUseCase,
    CreateAssetUseCase,
  ],
  exports: [
    GetPostPictureAssetsUseCase,
    GetPostAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    GetUserProfilePictureAssetUseCase,
    RemoveAssetUseCase,
    SaveAssetUseCase,
    CreateAssetUseCase,
  ],
})
export class SharedAssetModule {}
