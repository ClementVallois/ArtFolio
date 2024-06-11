import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { CategoryId } from 'src/domain/value objects/categoryId';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { UpdateCategoryDto } from 'src/presentation/dto/category/update-category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  async execute(
    id: CategoryId,
    categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOneCategory(id);

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
