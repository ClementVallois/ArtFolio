import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetArtistCategoriesUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(id: ArtistId): Promise<Category[]> {
    const artistCategories =
      await this.categoryRepository.findArtistCategories(id);

    if (artistCategories.length === 0) {
      throw new NotFoundException(
        `Categories not found for Artist with ID: ${id}`,
      );
    }
    return artistCategories;
  }
}
