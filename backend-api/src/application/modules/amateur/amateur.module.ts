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
import { ProfilePictureHandler } from 'src/application/handlers/profilePictureHandler';
import { CreateAmateurUseCase } from './use-cases/createAmateur.useCase';
import { GetAllAmateursUseCase } from './use-cases/getAllAmateurs.useCase';
import { AmateurController } from 'src/presentation/controllers/amateur.controller';
import { GetAmateurByIdUseCase } from './use-cases/getAmateurById.useCase';
import { GetUserAssetsUseCase } from './use-cases/getAmateurAssets.useCase';
import { UpdateAmateurUseCase } from './use-cases/updateAmateur.useCase';
import { RemoveAmateurUseCase } from './use-cases/removeAmateur.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset, Post])],
  controllers: [AmateurController],
  providers: [
    { provide: AmateurRepository, useClass: AmateurRepository },
    CreateAmateurUseCase,
    GetAllAmateursUseCase,
    GetAmateurByIdUseCase,
    GetUserAssetsUseCase,
    UpdateAmateurUseCase,
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
