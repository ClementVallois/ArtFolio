import { Module } from '@nestjs/common';
import { ArtistController } from '../../../presentation/controllers/artist.controller';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { Category } from 'src/domain/entities/category.entity';
import { SharedPostModule } from 'src/application/shared/modules/post/shared-post.module';
import { ArtistUseCaseProxy } from './proxies/artistUseCase.proxy';
import { SharedArtistModule } from 'src/application/shared/modules/artist/shared-artist.module';
import { GetAllArtistsUseCase } from './use-cases/getAllArtists.useCase';
import { GetArtistByIdUseCase } from './use-cases/getArtistById.useCase';
import { SharedCategoryUseCaseProxy } from 'src/application/shared/modules/category/proxies/sharedCategoryUseCase.proxy';
import { SharedCategoryModule } from 'src/application/shared/modules/category/shared-category.module';
import { GetArtistCategoriesUseCase } from '../category/use-cases/getArtistCategories.useCase';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { CreateArtistUseCase } from './use-cases/createArtist.useCase';
import { AssignCategoriesToArtistUseCase } from '../category/use-cases/assignCategoriesToArtist.useCase';
import { ValidationService } from 'src/application/validators/validation.service';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { GetCategoryByIdUseCase } from '../category/use-cases/getCategoryById.useCase';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { GetUserProfilePictureUseCase } from '../asset/use-cases/getUserProfilePicture.useCase';
import { GetUserByIdUseCase } from '../user/use-cases/getUserById.useCase';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { SaveAssetUseCase } from '../asset/use-cases/saveAsset.useCase';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { CreateAssetUseCase } from '../asset/use-cases/createAsset.useCase';
import { UpdateArtistUseCase } from './use-cases/updateArtist.useCase';
import { RemoveArtistUseCase } from './use-cases/removeArtist.useCase';
import { GetRandomArtistsPostUseCase } from './use-cases/getRandomArtistsPost.useCase';
import { GetPostAssetsUseCase } from '../asset/use-cases/getPostAssets.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Asset, Category]),
    SharedPostModule,
    SharedArtistModule,
    SharedCategoryModule,
  ],
  controllers: [ArtistController],
  providers: [
    { provide: 'IArtistRepository', useClass: ArtistRepository },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IAssetRepository', useClass: AssetRepository },
    ArtistUseCaseProxy,
    GetAllArtistsUseCase,
    CreateArtistUseCase,
    AssignCategoriesToArtistUseCase,
    ValidationService,
    DatabaseErrorHandler,
    UpdateArtistUseCase,
    RemoveArtistUseCase,
    GetRandomArtistsPostUseCase,
    GetPostAssetsUseCase,
    ProfilePictureHandler,
    GetUserByIdUseCase,
    GetCategoryByIdUseCase,
    FileService,
    CreateAssetUseCase,
    SaveAssetUseCase,
    ProfilePictureService,
    GetUserProfilePictureUseCase,
    GetArtistByIdUseCase,
    SharedCategoryUseCaseProxy,
    GetArtistCategoriesUseCase,
  ],
  exports: [ArtistUseCaseProxy],
})
export class ArtistModule {}
