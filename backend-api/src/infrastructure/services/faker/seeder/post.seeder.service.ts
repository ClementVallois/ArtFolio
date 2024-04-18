import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Post } from 'src/infrastructure/entities/post.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Category } from 'src/infrastructure/entities/category.entity';

@Injectable()
export class PostSeederService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async clear(): Promise<void> {
    await this.postRepository.query('TRUNCATE TABLE posts CASCADE');
  }

  async seed(): Promise<void> {
    const users = await this.userRepository.find({ where: { role: 'artist' } });

    const fakeData = Array.from({ length: 10 }, () => {
      const user = faker.helpers.arrayElement(users);

      const fakeEntity = new Post();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.isPinned = faker.datatype.boolean();
      fakeEntity.userId = user;
      fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.postRepository.save(fakeData);
  }
}
