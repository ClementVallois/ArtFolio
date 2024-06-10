import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { ArtistId } from 'src/domain/value objects/artistId';
import { Repository } from 'typeorm';

@Injectable()
export class GetArtistCategoriesUseCase {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(id: ArtistId): Promise<Category[]> {
    const artistId = id.toString();
    const categories = await this.categoryRepository.find({
      where: { user: { id: artistId } },
    });
    if (!categories || categories.length === 0) {
      throw new NotFoundException(
        `Categories not found for User with ID: ${artistId}`,
      );
    }
    return categories;
  }
}
