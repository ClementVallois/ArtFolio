import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetArtistCategoriesUseCase } from 'src/application/modules/category/use-cases/getArtistCategories.useCase';
import { Category } from 'src/domain/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [GetArtistCategoriesUseCase],
  exports: [GetArtistCategoriesUseCase],
})
export class SharedCategoryModule {}
