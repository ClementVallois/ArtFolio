import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/interfaces/category.repository.interface';
import { ArtistId } from 'src/domain/value objects/artistId';
import { CategoryId } from 'src/domain/value objects/categoryId';
import { CreateCategoryDto } from 'src/presentation/dto/category/create-category.dto';
import { UpdateCategoryDto } from 'src/presentation/dto/category/update-category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const categoryToCreate = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(categoryToCreate);
  }
  updateCategory(
    existingCategoryData: Category,
    newCategoryData: UpdateCategoryDto,
  ): Promise<Category> {
    const existingCategory = this.categoryRepository.merge(
      existingCategoryData,
      newCategoryData,
    );
    return this.categoryRepository.save(existingCategory);
  }

  remove(category: Category): Promise<Category> {
    return this.categoryRepository.remove(category);
  }

  save(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<Category[] | undefined> {
    return this.categoryRepository.find();
  }
  findOne(categoryId: CategoryId): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { id: categoryId.toString() },
    });
  }

  findArtistCategories(artistId: ArtistId): Promise<Category[]> {
    const artistIdValue = artistId.toString();
    const artistCategories = this.categoryRepository.find({
      where: { user: { id: artistIdValue } },
    });
    return artistCategories;
  }
}
