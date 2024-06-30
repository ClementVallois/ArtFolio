import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';

@Injectable()
export class GetArtistCategoriesUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

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
