import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetArtistCategoriesUseCase } from 'src/application/modules/category/use-cases/getArtistCategories.useCase';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
    GetArtistCategoriesUseCase,
  ],
  exports: [GetArtistCategoriesUseCase],
})
export class SharedCategoryModule {}
