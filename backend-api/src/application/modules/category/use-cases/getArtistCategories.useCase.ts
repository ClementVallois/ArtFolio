import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ArtistId } from 'src/domain/value objects/artistId';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Injectable()
export class GetArtistCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: ArtistId): Promise<Category[]> {
    const artistCategories =
      await this.categoryRepository.findArtistCategories(id);

    if (artistCategories.length === 0) {
      throw new NotFoundException(
        `Categories not found for User with ID: ${id}`,
      );
    }
    return artistCategories;
  }
}
