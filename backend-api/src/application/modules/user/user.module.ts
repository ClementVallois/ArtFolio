import { Module, forwardRef } from '@nestjs/common';
import { UserController } from 'src/presentation/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { Post } from 'src/domain/entities/post.entity';
import { Category } from 'src/domain/entities/category.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
import { GetCategoryByIdUseCase } from '../../shared/modules/category/use-cases/getCategoryById.useCase';
import { GetUserByIdUseCase } from './use-cases/getUserById.useCase';
import { GetUserByAuth0IdUseCase } from './use-cases/getUserByAuth0Id.useCase';
import { GetUserDataRequestsUseCase } from './use-cases/getUserDataRequests.useCase';
import { SaveAssetUseCase } from '../../shared/modules/asset/use-cases/saveAsset.useCase';
import { CreateAssetUseCase } from '../../shared/modules/asset/use-cases/createAsset.useCase';
import { GetUserProfilePictureAssetUseCase } from '../../shared/modules/asset/use-cases/getUserProfilePictureAsset.useCase';
import { GetPostPictureAssetsUseCase } from '../../shared/modules/asset/use-cases/getPostPictureAssets.useCase';
import { GetArtistPostPictureAssetsUseCase } from '../../shared/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { RemoveAssetUseCase } from '../asset/use-cases/removeAsset.useCase';
import { CommonModule } from 'src/application/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Asset,
      PersonalDataRequest,
      Post,
      Category,
    ]),
    forwardRef(() => CommonModule),
  ],
  controllers: [UserController],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    { provide: 'IAssetRepository', useClass: AssetRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    {
      provide: 'IPersonalDataRequestRepository',
      useClass: PersonalDataRequestRepository,
    },
    ProfilePictureService,
    GetUserProfilePictureAssetUseCase,
    GetPostPictureAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    RemoveAssetUseCase,
    GetCategoryByIdUseCase,
    GetUserByIdUseCase,
    GetUserByAuth0IdUseCase,
    GetUserDataRequestsUseCase,
    SaveAssetUseCase,
    CreateAssetUseCase,
  ],
  exports: [
    GetUserProfilePictureAssetUseCase,
    GetPostPictureAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    RemoveAssetUseCase,
    GetCategoryByIdUseCase,
    GetUserByIdUseCase,
  ],
})
export class UserModule {}
