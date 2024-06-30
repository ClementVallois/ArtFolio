import { Module, forwardRef } from '@nestjs/common';
import { CategoryController } from 'src/presentation/controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { CreateCategoryUseCase } from './use-cases/createCategory.useCase';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { GetAllCategoriesUseCase } from './use-cases/getAllCategories.useCase';
import { UpdateCategoryUseCase } from './use-cases/updateCategory.useCase';
import { RemoveCategoryUseCase } from './use-cases/removeCategory.useCase';
import { CommonModule } from 'src/application/common/common.module';
import { SharedArtistModule } from 'src/application/shared/modules/artist/shared-artist.module';
import { SharedCategoryModule } from 'src/application/shared/modules/category/shared-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => SharedArtistModule),
    forwardRef(() => SharedCategoryModule),
    forwardRef(() => CommonModule),
  ],
  controllers: [CategoryController],
  providers: [
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    UpdateCategoryUseCase,
    RemoveCategoryUseCase,
  ],
  exports: [
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    UpdateCategoryUseCase,
    RemoveCategoryUseCase,
  ],
})
export class CategoryModule {}
