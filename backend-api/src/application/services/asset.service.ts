import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileData } from 'src/infrastructure/common/types/file.interface';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';

import { Repository } from 'typeorm';
import { ArtistId } from 'src/domain/value objects/artistId';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async getPostAssets(postId: string): Promise<Asset[]> {
    const postAssets = await this.assetRepository.find({
      where: { postId: { id: postId } },
    });

    if (!postAssets || postAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for Post with ID: ${postId}`,
      );
    }
    return postAssets;
  }

  async getUserAssets(userId: string): Promise<Asset[]> {
    const userAssets = await this.assetRepository.find({
      where: { userId: { id: userId } },
    });
    if (!userAssets || userAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for User with ID: ${userId}`,
      );
    }
    return userAssets;
  }

  async getArtistProfilePicture(artistId: ArtistId): Promise<Asset> {
    const artist = artistId.toString();
    const artistAsset = await this.assetRepository.findOne({
      where: { type: 'profile_picture', userId: { id: artist } },
    });

    if (!artistAsset) {
      return null;
    }
    return artistAsset;
  }

  async addOrUpdateProfilePictureMetadata(
    artistData: User,
    fileData: FileData,
  ): Promise<Asset> {
    const user = await this.userRepository.findOneBy({ id: artistData.id });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${artistData.id}`);
    }

    const existingProfilePicture = await this.assetRepository.findOne({
      where: { userId: { id: user.id }, type: 'profile_picture' },
    });

    if (existingProfilePicture) {
      existingProfilePicture.url = fileData.filePath;
      existingProfilePicture.mimetype = fileData.fileType;
      return this.assetRepository.save(existingProfilePicture);
    } else {
      const newProfilePicture = this.assetRepository.create({
        url: fileData.filePath,
        mimetype: fileData.fileType,
        type: 'profile_picture',
        userId: user,
      });
      return this.assetRepository.save(newProfilePicture);
    }
  }

  async addProfilePictureMetadataInDatabase(
    userId: string,
    fileData: FileData,
  ): Promise<Asset> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${userId}`);
    }

    const assetToCreate = this.assetRepository.create({
      url: fileData.filePath,
      mimetype: fileData.fileType,
      type: 'profile_picture',
      userId: user,
    });
    return this.assetRepository.save(assetToCreate);
  }

  async addPostPictureMetadataInDatabase(
    postId: string,
    userId: string,
    fileData: FileData,
  ): Promise<Asset> {
    const post = await this.postRepository.findOneBy({
      id: postId,
    });
    if (!post) {
      throw new NotFoundException(`Post not found with ID: ${postId}`);
    }

    const assetToCreate = this.assetRepository.create({
      url: fileData.filePath,
      mimetype: fileData.fileType,
      type: 'post_picture',
      postId: post,
      userId: { id: userId },
    });
    return this.assetRepository.save(assetToCreate);
  }
}
