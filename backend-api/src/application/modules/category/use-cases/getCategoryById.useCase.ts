import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryId } from 'src/domain/value objects/categoryId';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: CategoryId): Promise<Category> {
    const category = await this.categoryRepository.findOneCategory(id);
    if (!category) {
      throw new NotFoundException(`Category not found with ID: ${id}`);
    }
    return category;
  }
}
