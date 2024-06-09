import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/application/services/category.service';
import { Category } from 'src/domain/entities/category.entity';

@Injectable()
export class GetArtistCategoriesUseCase {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(userId: string): Promise<Category[]> {
    return this.categoryService.getArtistCategories(userId);
  }
}
