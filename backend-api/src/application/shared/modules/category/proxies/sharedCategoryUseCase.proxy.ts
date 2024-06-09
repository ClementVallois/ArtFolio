import { Injectable } from '@nestjs/common';
import { GetArtistCategoriesUseCase } from 'src/application/modules/category/use-cases/getArtistCategories.useCase';

@Injectable()
export class SharedCategoryUseCaseProxy {
  constructor(
    private readonly getArtistCategoriesUseCase: GetArtistCategoriesUseCase,
  ) {}

  getArtistCategories = this.getArtistCategoriesUseCase.execute.bind(
    this.getArtistCategoriesUseCase,
  );
}
