import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserController } from 'src/presentation/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from 'src/application/services/asset.service';
import { Post } from 'src/domain/entities/post.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { Category } from 'src/domain/entities/category.entity';
import { GetCategoryByIdUseCase } from '../category/use-cases/getCategoryById.useCase';
import { GetUserByIdUseCase } from './use-cases/getUserById.useCase';
import { SaveAssetUseCase } from '../asset/use-cases/saveAsset.useCase';
import { CreateAssetUseCase } from '../asset/use-cases/createAsset.useCase';
import { GetUserProfilePictureAssetUseCase } from '../asset/use-cases/getUserProfilePictureAsset.useCase';
import { GetPostPictureAssetsUseCase } from '../asset/use-cases/getPostPictureAssets.useCase';
import { GetArtistPostPictureAssetsUseCase } from '../asset/use-cases/getArtistPostPictureAssets.useCase';
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
    ProfilePictureService,
    UserService,
    GetUserProfilePictureAssetUseCase,
    GetPostPictureAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    RemoveAssetUseCase,
    GetCategoryByIdUseCase,
    GetUserByIdUseCase,
    SaveAssetUseCase,
    CreateAssetUseCase,
    FileService,
    AssetService,
  ],
  exports: [
    UserService,
    GetUserProfilePictureAssetUseCase,
    GetPostPictureAssetsUseCase,
    GetArtistPostPictureAssetsUseCase,
    RemoveAssetUseCase,
    GetCategoryByIdUseCase,
    GetUserByIdUseCase,
  ],
})
export class UserModule {}
