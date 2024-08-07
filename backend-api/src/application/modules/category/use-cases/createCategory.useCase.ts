import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { CreateCategoryDto } from 'src/presentation/dto/category/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  async execute(categoryData: CreateCategoryDto): Promise<Category> {
    let category: Category;
    try {
      category = await this.categoryRepository.createCategory(categoryData);
    } catch (error) {
      this.databaseErrorHandler.handleDatabaseError(error, categoryData);
    }
    return category;
  }
}
