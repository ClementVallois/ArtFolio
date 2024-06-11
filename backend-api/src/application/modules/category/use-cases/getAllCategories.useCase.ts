import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    if (!categories) {
      throw new NotFoundException(`No categories found`);
    }
    return categories;
  }
}
