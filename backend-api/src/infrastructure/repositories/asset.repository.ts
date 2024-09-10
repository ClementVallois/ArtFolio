import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { PostId } from 'src/domain/value-objects/postId';
import { UserId } from 'src/domain/value-objects/userId';
import { Repository } from 'typeorm';

@Injectable()
export class AssetRepository implements IAssetRepository {
  constructor(
    @InjectRepository(Asset)
    private readonly categoryRepository: Repository<Asset>,
  ) {}

  async findPostAssets(postId: PostId): Promise<Asset[]> {
    return this.categoryRepository.find({
      where: { postId: { id: postId.toString() } },
    });
  }
  async findUserAssets(userId: UserId): Promise<Asset[]> {
    return this.categoryRepository.find({
      where: { userId: { id: userId.toString() } },
    });
  }
  async findUserProfilePictureAsset(
    userId: AmateurId | ArtistId | UserId,
  ): Promise<Asset> {
    return this.categoryRepository.findOne({
      where: { type: 'profile_picture', userId: { id: userId.toString() } },
    });
  }

  async findArtistPostPictureAssets(artistId: ArtistId): Promise<Asset[]> {
    return this.categoryRepository.find({
      where: { type: 'post_picture', userId: { id: artistId.toString() } },
    });
  }

  async findPostPictureAssets(postId: PostId): Promise<Asset[]> {
    return this.categoryRepository.find({
      where: { type: 'post_picture', postId: { id: postId.toString() } },
    });
  }
  async createAsset(assetData: Partial<Asset>): Promise<Asset> {
    const newAsset = this.categoryRepository.create(assetData);
    return this.categoryRepository.save(newAsset);
  }
  async saveAsset(assetEntity: Asset): Promise<Asset> {
    return this.categoryRepository.save(assetEntity);
  }

  async removeAsset(asset: Asset): Promise<Asset> {
    return this.categoryRepository.remove(asset);
  }
}
