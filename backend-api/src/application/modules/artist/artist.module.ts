import { Module } from '@nestjs/common';
import { ArtistController } from '../../../presentation/controllers/artist.controller';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/application/services/category.service';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Asset, Category]),
    SharedPostModule,
    SharedArtistModule,
    SharedCategoryModule,
  ],
  controllers: [ArtistController],
  providers: [
    ArtistRepository,
    { provide: 'IArtistRepository', useClass: ArtistRepository },
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
