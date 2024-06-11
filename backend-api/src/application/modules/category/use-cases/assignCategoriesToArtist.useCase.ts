import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistId } from 'src/domain/value objects/artistId';
import { CategoryId } from 'src/domain/value objects/categoryId';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Injectable()
export class AssignCategoriesToArtistUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async execute(artistId: ArtistId, categoriesIds: string[]): Promise<void> {
    for (const categoryId of categoriesIds) {
      const category = await this.categoryRepository.findOneCategory(
        new CategoryId(categoryId),
      );
      if (!category) {
        throw new NotFoundException(`Category ${categoryId} not found`);
      }
      const artist = await this.artistRepository.findArtistById(artistId);
      if (!artist) {
        throw new NotFoundException(`Artist ${artistId} not found`);
      }
      category.user[0] = artist;
      await this.categoryRepository.saveCategory(category);
    }
  }
}
