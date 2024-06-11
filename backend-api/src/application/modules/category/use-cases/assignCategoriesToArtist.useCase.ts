import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { ArtistId } from 'src/domain/value objects/artistId';
import { CategoryId } from 'src/domain/value objects/categoryId';

@Injectable()
export class AssignCategoriesToArtistUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
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
