import { CreateCategoryDto } from 'src/presentation/dto/category/create-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryId } from '../value objects/categoryId';
import { UpdateCategoryDto } from 'src/presentation/dto/category/update-category.dto';

export interface ICategoryRepository {
  createCategory(categoryData: CreateCategoryDto): Promise<Category>;
  updateCategory(
    existingCategoryData: Category,
    newCategoryData: UpdateCategoryDto,
  ): Promise<Category>;
  remove(category: Category): Promise<Category>;
  findAll(): Promise<Category[] | undefined>;
  findOne(categoryId: CategoryId): Promise<Category>;
}
