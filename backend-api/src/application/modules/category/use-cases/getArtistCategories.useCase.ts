import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetArtistCategoriesUseCase {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(userId: string): Promise<Category[]> {
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
}
