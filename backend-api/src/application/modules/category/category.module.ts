import { Module } from '@nestjs/common';
import { CategoryService } from '../../services/category.service';
import { CategoryController } from 'src/presentation/controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { User } from 'src/domain/entities/user.entity';
import { SharedCategoryModule } from 'src/application/shared/modules/category/shared-category.module';
import { CreateCategoryUseCase } from './use-cases/createCategory.useCase';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { GetAllCategoriesUseCase } from './use-cases/getAllCategories.useCase';
import { UpdateCategoryUseCase } from './use-cases/updateCategory.useCase';
import { RemoveCategoryUseCase } from './use-cases/removeCategory.useCase';
import { GetCategoryByIdUseCase } from './use-cases/getCategoryById.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User]), SharedCategoryModule],
  controllers: [CategoryController],
  providers: [
    { provide: CategoryRepository, useClass: CategoryRepository },
    CategoryService,
    DatabaseErrorHandler,
    CreateCategoryUseCase,
    GetCategoryByIdUseCase,
    GetAllCategoriesUseCase,
    UpdateCategoryUseCase,
    RemoveCategoryUseCase,
  ],
})
export class CategoryModule {}
