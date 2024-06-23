import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { SaveAssetUseCase } from './use-cases/saveAsset.useCase';
import { AddProfilePictureMetadataUseCase } from './use-cases/addProfilePictureMetadata.useCase';
import { CreateAssetUseCase } from './use-cases/createAsset.useCase';
import { GetArtistPostPictureAssetsUseCase } from './use-cases/getArtistPostPictureAssets.useCase';
import { GetPostPictureAssetsUseCase } from './use-cases/getPostPictureAssets.useCase';
import { GetUserAssetsUseCase } from './use-cases/getUserAssets.useCase';
import { RemoveAssetUseCase } from './use-cases/removeAsset.useCase';
import { UpdateProfilePictureMetadataUseCase } from './use-cases/updateProfilePictureMetadata.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [],
  providers: [
    { provide: 'IAssetRepository', useClass: AssetRepository },
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
    'IAssetRepository',
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
