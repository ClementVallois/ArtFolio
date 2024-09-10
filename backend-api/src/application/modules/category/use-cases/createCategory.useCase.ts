import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { CreateCategoryDto } from 'src/presentation/dto/category/create-category.dto';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  @LogMethod(LogLevel.DEBUG)
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
