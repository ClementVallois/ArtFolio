import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { CategoryId } from 'src/domain/value-objects/categoryId';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { UpdateCategoryDto } from 'src/presentation/dto/category/update-category.dto';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  @LogMethod(LogLevel.DEBUG)
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
      this.databaseErrorHandler.handleDatabaseError(error, categoryData);
    }
  }
}
