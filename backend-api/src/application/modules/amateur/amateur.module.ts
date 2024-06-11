import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from 'src/application/services/asset.service';
import { Post } from 'src/domain/entities/post.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { ValidationService } from 'src/application/validators/validation.service';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { CreateAmateurUseCase } from './use-cases/createAmateur.useCase';
import { GetAllAmateursUseCase } from './use-cases/getAllAmateurs.useCase';
import { AmateurController } from 'src/presentation/controllers/amateur.controller';
import { GetAmateurByIdUseCase } from './use-cases/getAmateurById.useCase';
import { UpdateAmateurUseCase } from './use-cases/updateAmateur.useCase';
import { RemoveAmateurUseCase } from './use-cases/removeAmateur.useCase';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { GetUserProfilePictureUseCase } from '../asset/use-cases/getUserProfilePicture.useCase';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { Category } from 'src/domain/entities/category.entity';
import { GetCategoryByIdUseCase } from '../category/use-cases/getCategoryById.useCase';
import { GetUserByIdUseCase } from '../user/use-cases/getUserById.useCase';
import { CreateAssetUseCase } from '../asset/use-cases/createAsset.useCase';
import { SaveAssetUseCase } from '../asset/use-cases/saveAsset.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset, Post, Category])],
  controllers: [AmateurController],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    { provide: 'IAssetRepository', useClass: AssetRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    GetUserProfilePictureUseCase,
    CreateAmateurUseCase,
    GetAllAmateursUseCase,
    GetAmateurByIdUseCase,
    UpdateAmateurUseCase,
    GetCategoryByIdUseCase,
    GetUserByIdUseCase,
    SaveAssetUseCase,
    CreateAssetUseCase,
    ProfilePictureService,
    RemoveAmateurUseCase,
    ValidationService,
    DatabaseErrorHandler,
    ProfilePictureHandler,
    ErrorService,
    FileService,
    AssetService,
  ],
  exports: [],
})
export class AmateurModule {}
