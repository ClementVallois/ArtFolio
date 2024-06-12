import { Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { FileData } from 'src/infrastructure/common/types/file.interface';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';

@Injectable()
export class UpdateProfilePictureMetadataUseCase {
  constructor(private readonly assetRepository: IAssetRepository) {}

  async execute(userId: UserId, fileData: FileData): Promise<Asset> {
    const existingProfilePicture =
      await this.assetRepository.findUserProfilePictureAsset(userId);

    if (!existingProfilePicture) {
      throw new NotFoundException(
        `Profile picture not found for User with ID: ${userId}`,
      );
    }
    existingProfilePicture.url = fileData.filePath;
    existingProfilePicture.mimetype = fileData.fileType;
    return this.assetRepository.saveAsset(existingProfilePicture);
  }
}
