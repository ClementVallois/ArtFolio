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
import { Category } from 'src/domain/entities/category.entity';
import { GetLastRegisteredArtistsPostsUseCase } from 'src/application/modules/artist/use-cases/getLastRegisteredArtistsPosts.useCase';
import { GetRandomArtistsPostUseCase } from 'src/application/modules/artist/use-cases/getRandomArtistsPost.useCase';
import { CreateArtistUseCase } from 'src/application/modules/artist/use-cases/createArtist.useCase';
import { UpdateArtistUseCase } from 'src/application/modules/artist/use-cases/updateArtist.useCase';
import { RemoveArtistUseCase } from 'src/application/modules/artist/use-cases/removeArtist.useCase';
import { SharedPostUseCaseProxy } from '../post/proxies/sharedPostUseCase.proxy';
import { ValidationService } from 'src/application/validators/validation.service';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { GetArtistByIdUseCase } from 'src/application/modules/artist/use-cases/getArtistById.useCase';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';
import { AssignCategoriesToArtistUseCase } from 'src/application/modules/category/use-cases/assignCategoriesToArtist.useCase';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { GetAmateurByIdUseCase } from 'src/application/modules/amateur/use-cases/getAmateurById.useCase';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { PostRepository } from 'src/infrastructure/repositories/post.repository';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { GetUserProfilePictureUseCase } from 'src/application/modules/asset/use-cases/getUserProfilePicture.useCase';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { GetCategoryByIdUseCase } from 'src/application/modules/category/use-cases/getCategoryById.useCase';
import { GetUserByIdUseCase } from 'src/application/modules/user/use-cases/getUserById.useCase';
import { SaveAssetUseCase } from 'src/application/modules/asset/use-cases/saveAsset.useCase';
import { CreateAssetUseCase } from 'src/application/modules/asset/use-cases/createAsset.useCase';
import { GetPostAssetsUseCase } from 'src/application/modules/asset/use-cases/getPostAssets.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Asset, Category])],
  providers: [
    { provide: 'IArtistRepository', useClass: ArtistRepository },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    { provide: 'IPostRepository', useClass: PostRepository },
    { provide: 'IAssetRepository', useClass: AssetRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    FileService,
    ErrorService,
    GetArtistByIdUseCase,
    DatabaseErrorHandler,
    ProfilePictureHandler,
    AssetService,
    GetCategoryByIdUseCase,
    ValidationService,
    SharedArtistUseCaseProxy,
    GetPostAssetsUseCase,
    GetRandomArtistsPostUseCase,
    GetAllPostsUseCase,
    GetLastRegisteredArtistsPostsUseCase,
    GetArtistPinnedPostUseCase,
    ProfilePictureService,
    GetUserByIdUseCase,
    SaveAssetUseCase,
    CreateAssetUseCase,
    GetUserProfilePictureUseCase,
    GetAllArtistPostsUseCase,
    GetOneArtistPostUseCase,
    GetAmateurByIdUseCase,
    CreatePostUseCase,
    CreateArtistUseCase,
    AssignCategoriesToArtistUseCase,
    UpdateArtistUseCase,
    RemoveArtistUseCase,
    SharedPostUseCaseProxy,
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
