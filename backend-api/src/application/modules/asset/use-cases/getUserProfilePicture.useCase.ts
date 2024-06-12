import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { UserId } from 'src/domain/value-objects/userId';

@Injectable()
export class GetUserProfilePictureUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(userId: AmateurId | ArtistId | UserId): Promise<Asset | null> {
    try {
      const userProfilePicture =
        await this.assetRepository.findUserProfilePictureAsset(userId);
      if (!userProfilePicture) {
        throw new NotFoundException(
          `Profile picture asset not found for User with ID: ${userId}`,
        );
      }
      return userProfilePicture;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}
