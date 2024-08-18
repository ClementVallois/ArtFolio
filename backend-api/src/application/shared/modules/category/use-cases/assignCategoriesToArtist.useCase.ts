import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { CategoryId } from 'src/domain/value-objects/categoryId';
import { GetArtistByIdUseCase } from '../../artist/use-cases/getArtistById.useCase';
import { GetCategoryByIdUseCase } from './getCategoryById.useCase';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class AssignCategoriesToArtistUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(artistId: ArtistId, categoriesIds: string[]): Promise<void> {
    const artist = await this.getArtistByIdUseCase.execute(artistId);
    for (const categoryId of categoriesIds) {
      const category = await this.getCategoryByIdUseCase.execute(
        new CategoryId(categoryId),
      );
      category.user = [artist];
      await this.categoryRepository.saveCategory(category);
    }
  }
}
