import { CreateCategoryDto } from 'src/presentation/dto/category/create-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryId } from '../value objects/categoryId';
import { UpdateCategoryDto } from 'src/presentation/dto/category/update-category.dto';
import { ArtistId } from '../value objects/artistId';

export interface ICategoryRepository {
  createCategory(categoryData: CreateCategoryDto): Promise<Category>;
  updateCategory(
    existingCategoryData: Category,
    newCategoryData: UpdateCategoryDto,
  ): Promise<Category>;
  removeCategory(category: Category): Promise<Category>;
  findAllCategories(): Promise<Category[]>;
  findOneCategory(categoryId: CategoryId): Promise<Category>;
  saveCategory(category: Category): Promise<Category>;
  findArtistCategories(artistId: ArtistId): Promise<Category[]>;
}
