import { Module } from '@nestjs/common';
import { AssetModule } from 'src/application/modules/asset/asset.module';
import { CreateAssetUseCase } from 'src/application/modules/asset/use-cases/createAsset.useCase';
import { GetArtistPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetPostAssetsUseCase } from 'src/application/modules/asset/use-cases/getPostAssets.useCase';
import { GetPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getPostPictureAssets.useCase';
import { GetUserProfilePictureAssetUseCase } from 'src/application/modules/asset/use-cases/getUserProfilePictureAsset.useCase';
import { RemoveAssetUseCase } from 'src/application/modules/asset/use-cases/removeAsset.useCase';
import { SaveAssetUseCase } from 'src/application/modules/asset/use-cases/saveAsset.useCase';

@Module({
  imports: [AssetModule],
  controllers: [],
  providers: [
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
