import { Injectable } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { CreateCategoryDto } from 'src/presentation/dto/category/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  async execute(categoryData: CreateCategoryDto): Promise<Category> {
    let category: Category;
    try {
      category = await this.categoryRepository.createCategory(categoryData);
    } catch (error) {
      console.log(error.detail);
      this.databaseErrorHandler.handleDatabaseError(error, categoryData);
    }
    return category;
  }
}
