import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryId } from 'src/domain/value objects/categoryId';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { UpdateCategoryDto } from 'src/presentation/dto/category/update-category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  async execute(
    id: CategoryId,
    categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne(id);

    if (!existingCategory) {
      throw new NotFoundException(`Category not found with ID: ${id}`);
    }

    try {
      return await this.categoryRepository.updateCategory(
        existingCategory,
        categoryData,
      );
    } catch (error) {
      console.log(error.detail);
      this.databaseErrorHandler.handleDatabaseError(error, categoryData);
    }
  }
}
