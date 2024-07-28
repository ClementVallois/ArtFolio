import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignCategoriesToArtistUseCase } from 'src/application/shared/modules/category/use-cases/assignCategoriesToArtist.useCase';
import { GetArtistCategoriesUseCase } from 'src/application/shared/modules/category/use-cases/getArtistCategories.useCase';
import { GetCategoryByIdUseCase } from 'src/application/shared/modules/category/use-cases/getCategoryById.useCase';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { SharedArtistModule } from '../artist/shared-artist.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => SharedArtistModule),
  ],
  providers: [
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    GetArtistCategoriesUseCase,
    GetCategoryByIdUseCase,
    AssignCategoriesToArtistUseCase,
  ],
  exports: [
    GetArtistCategoriesUseCase,
    GetCategoryByIdUseCase,
    AssignCategoriesToArtistUseCase,
  ],
})
export class SharedCategoryModule {}
