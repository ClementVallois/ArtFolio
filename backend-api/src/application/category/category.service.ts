import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../../presentation/category/dto/create-category.dto';
import { UpdateCategoryDto } from '../../presentation/category/dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async getArtistCategories(userId: string): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: { user: { id: userId } },
    });
    if (!categories || categories.length === 0) {
      throw new NotFoundException(
        `Categories not found for User with ID: ${userId}`,
      );
    }
    return categories;
  }

  async assignCategoriesToArtist(
    userId: string,
    categoriesIds: string[],
  ): Promise<void> {
    for (const categoryId of categoriesIds) {
      const category = await this.getOneCategory(categoryId);
      category.user = await this.userRepository.findBy({ id: userId });
      await this.categoryRepository.save(category);
    }
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

  async removeCategory(id: string): Promise<Category> {
    const category = await this.getOneCategory(id);
    return await this.categoryRepository.remove(category);
  }
}
