import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { SaveAssetUseCase } from '../../shared/modules/asset/use-cases/saveAsset.useCase';
import { AddProfilePictureMetadataUseCase } from './use-cases/addProfilePictureMetadata.useCase';
import { CreateAssetUseCase } from '../../shared/modules/asset/use-cases/createAsset.useCase';
import { GetArtistPostPictureAssetsUseCase } from '../../shared/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetPostPictureAssetsUseCase } from '../../shared/modules/asset/use-cases/getPostPictureAssets.useCase';
import { GetUserAssetsUseCase } from './use-cases/getUserAssets.useCase';
import { RemoveAssetUseCase } from './use-cases/removeAsset.useCase';
import { UpdateProfilePictureMetadataUseCase } from './use-cases/updateProfilePictureMetadata.useCase';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [],
  providers: [
    { provide: 'IAssetRepository', useClass: AssetRepository },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    SaveAssetUseCase,
    AddProfilePictureMetadataUseCase,
    CreateAssetUseCase,
    GetArtistPostPictureAssetsUseCase,
    GetPostPictureAssetsUseCase,
    GetUserAssetsUseCase,
    RemoveAssetUseCase,
    UpdateProfilePictureMetadataUseCase,
  ],
  exports: [
    SaveAssetUseCase,
    AddProfilePictureMetadataUseCase,
    CreateAssetUseCase,
    GetArtistPostPictureAssetsUseCase,
    GetPostPictureAssetsUseCase,
    GetUserAssetsUseCase,
    RemoveAssetUseCase,
    UpdateProfilePictureMetadataUseCase,
  ],
})
export class AssetModule {}
