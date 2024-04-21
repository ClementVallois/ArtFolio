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
    const posts = await this.postRepository.find({ relations: ['userId'] });

    //Add post asset for artists only
    const fakeData = Array.from({ length: 10 }, () => {
      const artistUsers = faker.helpers.arrayElement(
        users.filter((user) => {
          return user.role === 'artist';
        }),
      );
      const post = faker.helpers.arrayElement(posts);
      const asset = new Asset();
      asset.id = faker.string.uuid();
      asset.url = faker.internet.url();
      asset.postId = post;
      asset.type = 'post_picture';
      asset.userId = artistUsers;
      asset.createdAt = faker.date.recent();
      asset.updatedAt = faker.date.recent();
      return asset;
    });
    await this.assetRepository.save(fakeData);

    // Add profile pictures asset for users
    for (const user of users) {
      const existingProfilePicture = await this.assetRepository.findOne({
        where: { userId: { id: user.id }, type: 'profile_picture' },
      });

      if (!existingProfilePicture) {
        const newProfilePicture = new Asset();
        newProfilePicture.type = 'profile_picture';
        newProfilePicture.userId = { id: user.id } as User;
        newProfilePicture.id = faker.string.uuid();
        newProfilePicture.url = faker.internet.url();
        newProfilePicture.createdAt = faker.date.recent();
        newProfilePicture.updatedAt = faker.date.recent();

        await this.assetRepository.save(newProfilePicture);
      }
    }

    // Add post pictures asset for existing artists
    const artistUsers = await this.userRepository.find({
      where: { role: 'artist' },
    });

    for (const user of artistUsers) {
      const posts = await this.postRepository.find({
        where: { userId: { id: user.id } },
      });

      for (const post of posts) {
        const existingAsset = await this.assetRepository.findOne({
          where: { postId: { id: post.id }, type: 'post_picture' },
        });

        if (!existingAsset) {
          const asset = new Asset();
          asset.id = faker.string.uuid();
          asset.postId = post;
          asset.type = 'post_picture';
          asset.userId = user;
          asset.url = faker.internet.url();
          asset.createdAt = faker.date.recent();
          asset.updatedAt = faker.date.recent();
          await this.assetRepository.save(asset);
        }
      }
    }
  }
}
