import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAllCategories();

    if (categories.length === 0) {
      throw new NotFoundException(`No categories found`);
    }
    return categories;
  }
}
