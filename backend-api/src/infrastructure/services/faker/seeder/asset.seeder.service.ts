import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Post } from 'src/infrastructure/entities/post.entity';

@Injectable()
export class AssetSeederService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async clear(): Promise<void> {
    await this.postRepository.query('TRUNCATE TABLE assets CASCADE');
  }

  async seed(): Promise<void> {
    const users = await this.userRepository.find();
    const posts = await this.postRepository.find();

    const fakeData = Array.from({ length: 10 }, () => {
      const user = faker.helpers.arrayElement(users);
      const post = faker.helpers.arrayElement(posts);

      const fakeEntity = new Asset();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.post = post;
      fakeEntity.user = user;
      fakeEntity.url = faker.internet.url();
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.assetRepository.save(fakeData);
  }
}
