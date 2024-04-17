import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Category } from 'src/infrastructure/entities/category.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Post } from 'src/infrastructure/entities/post.entity';

@Injectable()
export class CategorySeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async clear(): Promise<void> {
    await this.categoryRepository.query('TRUNCATE TABLE categories CASCADE');
    await this.categoryRepository.query(
      'TRUNCATE TABLE posts_categories CASCADE',
    );
    await this.categoryRepository.query(
      'TRUNCATE TABLE users_categories CASCADE',
    );
  }

  async seed(): Promise<void> {
    const users = await this.userRepository.find({ where: { role: 'artist' } });
    const posts = await this.postRepository.find();

    const fakeData = Array.from({ length: 10 }, () => {
      const user = faker.helpers.arrayElement(users);
      const post = faker.helpers.arrayElement(posts);
      const fakeEntity = new Category();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.name = faker.string.alpha(30);
      fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
      fakeEntity.post = [post];
      fakeEntity.user = [user];
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.categoryRepository.save(fakeData);
  }
}
