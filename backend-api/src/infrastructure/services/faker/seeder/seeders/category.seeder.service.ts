import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Category } from 'src/domain/entities/category.entity';
import { User } from 'src/domain/entities/user.entity';
import { Post } from 'src/domain/entities/post.entity';

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

  private fakeCategoryNames = [
    'Peinture',
    'Sculpture',
    'Photographie',
    'Dessin',
    'Art numérique',
    'Art abstrait',
    'Art figuratif',
    'Art contemporain',
    'Art conceptuel',
    'Graffiti',
    'Art graphique',
    'Art cinétique',
    'Céramique',
    'Mosaïque',
    'Vitrail',
  ];

  async seed(): Promise<void> {
    await this.seedCategories();
    await this.seedCategoriesToArtists();
    await this.seedCategoriesToPosts();
  }

  private async seedCategories() {
    // Create categories
    for (const name of this.fakeCategoryNames) {
      if (await this.categoryRepository.findOne({ where: { name } })) {
        continue;
      }
      const fakeEntity = new Category();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.name = name;
      fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();
      await this.categoryRepository.save(fakeEntity);
    }
  }

  private async seedCategoriesToArtists() {
    const artists = await this.userRepository.find({
      where: { role: 'artist' },
    });

    const categories = await this.categoryRepository.find({
      relations: ['user'],
    });

    //Add categories to existing artists
    for (const artist of artists) {
      let alreadyHasCategory = false;
      for (const category of categories) {
        if (category.user.some((user) => user.id === artist.id)) {
          alreadyHasCategory = true;
        }
      }

      if (alreadyHasCategory) {
        continue;
      }

      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      randomCategory.user.push(artist);

      await this.categoryRepository.save(randomCategory);
    }
  }

  private async seedCategoriesToPosts() {
    const existingPosts = await this.postRepository.find();

    const categories = await this.categoryRepository.find({
      relations: ['post'],
    });

    //Add categories to existing posts
    for (const existingPost of existingPosts) {
      let alreadyHasCategory = false;
      for (const category of categories) {
        if (category.post.some((post) => post.id === existingPost.id)) {
          alreadyHasCategory = true;
        }
      }

      if (alreadyHasCategory) {
        continue;
      }

      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      randomCategory.post.push(existingPost);

      await this.categoryRepository.save(randomCategory);
    }
  }
}
