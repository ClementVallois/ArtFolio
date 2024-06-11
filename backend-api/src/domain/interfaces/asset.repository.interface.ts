import { Asset } from '../entities/asset.entity';
import { AmateurId } from '../value objects/amateurId';
import { ArtistId } from '../value objects/artistId';
import { PostId } from '../value objects/postId';
import { UserId } from '../value objects/userId';

export interface IAssetRepository {
  findPostAssets(id: PostId): Promise<Asset[]>;
  findUserAssets(userId: UserId): Promise<Asset[]>;
  findUserProfilePictureAsset(
    userId: AmateurId | ArtistId | UserId,
  ): Promise<Asset>;
  createAsset(assetData: Partial<Asset>): Promise<Asset>;
  saveAsset(assetEntity: Asset): Promise<Asset>;
}
