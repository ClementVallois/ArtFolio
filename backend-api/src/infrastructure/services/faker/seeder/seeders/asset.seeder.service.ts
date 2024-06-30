import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { Post } from 'src/domain/entities/post.entity';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

@Injectable()
export class AssetSeederService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async clear(): Promise<void> {
    await this.postRepository.query('TRUNCATE TABLE assets CASCADE');
  }

  async seed(): Promise<void> {
    await this.addAssetsToPosts();
    await this.addAssetsToArtists();
    await this.seedAmateurProfilePictures();
    await this.seedArtistProfilePictures();
  }

  private async addAssetsToPosts(): Promise<void> {
    const users = await this.userRepository.find();
    const posts = await this.postRepository.find({ relations: ['user'] });

    const assetFolders = [
      'dessin',
      'mosaique',
      'peinture',
      'photographie',
      'poterie',
      'realisme',
      'vitrail',
    ];

    for (const post of posts) {
      const existingAsset = await this.assetRepository.findOne({
        where: { postId: { id: post.id }, type: 'post_picture' },
      });

      if (existingAsset) {
        this.logger.warn(
          `Asset already exists for post ${post.id}, skipping...`,
        );
        continue;
      }
      const artistUsers = users.filter((user) => user.role === 'artist');
      const randomArtist = faker.helpers.arrayElement(artistUsers);
      const randomFolder = faker.helpers.arrayElement(assetFolders);

      const filePath = this.configService.get<string>('DEV_PHOTO_SEED');
      const folderPath = path.join(filePath, randomFolder);

      const fileNames = fs.readdirSync(folderPath);
      if (fileNames.length === 0) {
        console.warn(`No files found in ${folderPath}`);
        continue;
      }

      const randomIndex = faker.number.int({
        min: 0,
        max: fileNames.length - 1,
      });
      const randomFileName = fileNames[randomIndex];
      const extension = path.extname(randomFileName).toLowerCase();
      let mimeType: string;

      if (extension === '.png') {
        mimeType = 'image/png';
      } else if (extension === '.jpg' || extension === '.jpeg') {
        mimeType = 'image/jpeg';
      } else if (extension === '.webp') {
        mimeType = 'image/webp';
      } else {
        console.warn(`Unsupported file extension for ${randomFileName}`);
        continue;
      }

      const asset = new Asset();
      asset.id = faker.string.uuid();
      asset.url = `${filePath}/${randomFolder}/${randomFileName}`;
      asset.postId = post;
      asset.type = 'post_picture';
      asset.mimetype = mimeType;
      asset.userId = randomArtist;
      asset.createdAt = faker.date.recent();
      asset.updatedAt = faker.date.recent();

      await this.assetRepository.save(asset);
    }
  }

  private async seedAmateurProfilePictures(): Promise<void> {
    const users = await this.userRepository.find({
      where: { role: 'amateur' },
    });
    const filePath = this.configService.get<string>('DEV_PHOTO_SEED');
    const profilePictureDir = path.join(filePath, 'profil_picture');

    const fileNames = fs.readdirSync(profilePictureDir);

    for (const [index, user] of users.entries()) {
      const existingProfilePicture = await this.assetRepository.findOne({
        where: { userId: { id: user.id }, type: 'profile_picture' },
      });
      if (!existingProfilePicture) {
        const newProfilePicture = new Asset();
        const fileName = fileNames[index % fileNames.length];
        newProfilePicture.url = `${filePath}/profil_picture/${fileName}`;
        newProfilePicture.type = 'profile_picture';
        newProfilePicture.userId = { id: user.id } as User;

        const extension = path.extname(fileName).toLowerCase();
        let mimeType;
        if (extension === '.png') {
          mimeType = 'image/png';
        } else if (extension === '.jpg' || extension === '.jpeg') {
          mimeType = 'image/jpeg';
        } else if (extension === '.webp') {
          mimeType = 'image/webp';
        } else {
          mimeType = null;
        }

        newProfilePicture.mimetype = mimeType;
        if (!newProfilePicture.mimetype) {
          console.warn(`Unsupported file extension for ${fileName}`);
          continue;
        }
        newProfilePicture.id = faker.string.uuid();
        newProfilePicture.createdAt = faker.date.recent();
        newProfilePicture.updatedAt = faker.date.recent();
        await this.assetRepository.save(newProfilePicture);
      }
    }
  }

  private async seedArtistProfilePictures(): Promise<void> {
    const users = await this.userRepository.find({ where: { role: 'artist' } });
    const filePath = this.configService.get<string>('DEV_PHOTO_SEED');
    const profilePictureDir = path.join(filePath, 'profil_picture');

    const fileNames = fs.readdirSync(profilePictureDir);

    for (let i = fileNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fileNames[i], fileNames[j]] = [fileNames[j], fileNames[i]];
    }

    for (const [index, user] of users.entries()) {
      const existingProfilePicture = await this.assetRepository.findOne({
        where: { userId: { id: user.id }, type: 'profile_picture' },
      });
      if (!existingProfilePicture) {
        const newProfilePicture = new Asset();
        const fileName = fileNames[index % fileNames.length];
        newProfilePicture.url = `${filePath}/profil_picture/${fileName}`;
        newProfilePicture.type = 'profile_picture';
        newProfilePicture.userId = { id: user.id } as User;

        const extension = path.extname(fileName).toLowerCase();
        let mimeType;
        if (extension === '.png') {
          mimeType = 'image/png';
        } else if (extension === '.jpg' || extension === '.jpeg') {
          mimeType = 'image/jpeg';
        } else if (extension === '.webp') {
          mimeType = 'image/webp';
        } else {
          mimeType = null;
        }

        newProfilePicture.mimetype = mimeType;
        if (!newProfilePicture.mimetype) {
          console.warn(`Unsupported file extension for ${fileName}`);
          continue;
        }
        newProfilePicture.id = faker.string.uuid();
        newProfilePicture.createdAt = faker.date.recent();
        newProfilePicture.updatedAt = faker.date.recent();
        await this.assetRepository.save(newProfilePicture);
      }
    }
  }

  private async addAssetsToArtists(): Promise<void> {
    // Add post pictures asset for existing artists
    const artistUsers = await this.userRepository.find({
      where: { role: 'artist' },
    });

    for (const user of artistUsers) {
      const posts = await this.postRepository.find({
        where: { user: { id: user.id } },
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
          asset.mimetype = faker.helpers.arrayElement([
            'image/jpeg',
            'image/png',
          ]);
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
