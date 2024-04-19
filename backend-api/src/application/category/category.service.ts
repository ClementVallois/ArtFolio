import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../../presentation/category/dto/create-category.dto';
import { UpdateCategoryDto } from '../../presentation/category/dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/infrastructure/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new HttpException(
        'Error getting categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOneCategory(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category) {
      throw new NotFoundException(`Category not found with ID: ${id}`);
    }
    return category;
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const categoryToCreate = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(categoryToCreate);
  }

  async updateCategory(
    id: string,
    categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    const existingCategory = await this.getOneCategory(id);
    this.categoryRepository.merge(existingCategory, categoryData);
    return await this.categoryRepository.save(existingCategory);
  }

  async removeCategory(id: string) {
    const category = await this.getOneCategory(id);
    return await this.categoryRepository.remove(category);
  }
}
