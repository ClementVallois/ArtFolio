import { Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { ArtistId } from 'src/domain/value objects/artistId';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';

@Injectable()
export class GetUserProfilePictureUseCase {
  constructor(private readonly assetRepository: AssetRepository) {}

  async execute(userId: AmateurId | ArtistId): Promise<Asset> {
    const userProfilePicture =
      await this.assetRepository.findUserProfilePictureAsset(userId);
    if (!userProfilePicture) {
      throw new NotFoundException(
        `Profile picture asset not found for User with ID: ${userId}`,
      );
    }
    return userProfilePicture;
  }
}
