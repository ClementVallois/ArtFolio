import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { CategoryId } from 'src/domain/value-objects/categoryId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(id: CategoryId): Promise<Category> {
    const category = await this.categoryRepository.findOneCategory(id);
    if (!category) {
      throw new NotFoundException(`Category not found with ID: ${id}`);
    }
    return category;
  }
}
