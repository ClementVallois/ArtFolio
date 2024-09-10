import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { Category } from 'src/domain/entities/category.entity';

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
    await this.addPinnedPostToArtists();
    await this.seedPosts();
  }

  private async addPinnedPostToArtists(): Promise<void> {
    const artists = await this.userRepository.find({
      where: { role: 'artist' },
    });

    //Add pinned post to existing artists
    for (const artist of artists) {
      const existingPinnedPost = await this.postRepository.findOne({
        where: { user: { id: artist.id }, isPinned: true },
      });

      if (!existingPinnedPost) {
        const fakeEntity = new Post();
        fakeEntity.id = faker.string.uuid();
        fakeEntity.isPinned = true;
        fakeEntity.user = artist;
        fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
        fakeEntity.createdAt = faker.date.recent();
        fakeEntity.updatedAt = faker.date.recent();
        await this.postRepository.save(fakeEntity);
      }
    }
  }

  private async seedPosts(): Promise<void> {
    const artists = await this.userRepository.find({
      where: { role: 'artist' },
    });

    const fakeData = Array.from({ length: 50 }, () => {
      const user = faker.helpers.arrayElement(artists);

      const fakeEntity = new Post();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.isPinned = false;
      fakeEntity.user = user;
      fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.postRepository.save(fakeData);
  }
}
