import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Category } from 'src/infrastructure/entities/category.entity';

@Injectable()
export class CategorySeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed(): Promise<void> {
    const fakeData = Array.from({ length: 2 }, () => {
      const fakeEntity = new Category();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.name = faker.string.alpha(15);
      fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.categoryRepository.save(fakeData);
  }
}
