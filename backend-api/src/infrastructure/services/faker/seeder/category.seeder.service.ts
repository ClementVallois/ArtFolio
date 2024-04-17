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

  async clear(): Promise<void> {
    await this.categoryRepository.query('TRUNCATE TABLE categories CASCADE');
  }

  async seed(): Promise<void> {
    const fakeData = Array.from({ length: 4 }, () => {
      const fakeEntity = new Category();
      fakeEntity.id = faker.string.uuid();
      // fakeEntity.name = faker.helpers.arrayElement([
      //   'painting',
      //   'sculpture',
      //   'digital-art',
      //   'photography',
      //   '3d-modeling',
      //   'mixed-media',
      //   'installation',
      //   'fashion',
      //   'product-design',
      //   'conceptual-art',
      //   'graphic-design',
      //   'web-design',
      //   'textile',
      //   'jewelry',
      //   'fine-art',
      // ]);
      fakeEntity.name = faker.string.alpha(30);
      fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.categoryRepository.save(fakeData);
  }
}
