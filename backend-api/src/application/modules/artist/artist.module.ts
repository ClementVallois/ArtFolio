import { Module } from '@nestjs/common';
import { ArtistController } from '../../../presentation/controllers/artist.controller';
import { ArtistService } from 'src/application/services/artist.service';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetService } from 'src/application/services/asset.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { CategoryService } from 'src/application/services/category.service';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { ValidationService } from '../../validators/validation.service';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { Category } from 'src/domain/entities/category.entity';
import { SharedPostModule } from 'src/application/shared/modules/post/shared-post.module';
import { ArtistUseCaseProxy } from './proxies/artistUseCase.proxy';
import { SharedArtistModule } from 'src/application/shared/modules/artist/shared-artist.module';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ProfilePictureHandler } from 'src/application/handlers/profilePictureHandler';
import { GetAllArtistsUseCase } from './use-cases/getAllArtists.useCase';
import { GetArtistByIdUseCase } from './use-cases/getArtistById.useCase';
import { SharedCategoryUseCaseProxy } from 'src/application/shared/modules/category/proxies/sharedCategoryUseCase.proxy';
import { SharedCategoryModule } from 'src/application/shared/modules/category/shared-category.module';
import { GetArtistCategoriesUseCase } from '../category/use-cases/getArtistCategories.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Asset, Category]),
    SharedPostModule,
    SharedArtistModule,
    SharedCategoryModule,
  ],
  controllers: [ArtistController],
  providers: [
    CategoryService,
    ArtistUseCaseProxy,
    GetAllArtistsUseCase,
    GetArtistByIdUseCase,
    SharedCategoryUseCaseProxy,
    GetArtistCategoriesUseCase,
  ],
  exports: [ArtistUseCaseProxy],
})
export class ArtistModule {}
