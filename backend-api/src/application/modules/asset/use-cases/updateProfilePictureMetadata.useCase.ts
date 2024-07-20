import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { FileData } from 'src/infrastructure/common/types/file.interface';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

@Injectable()
export class UpdateProfilePictureMetadataUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(userId: UserId, fileData: FileData): Promise<Asset> {
    try {
      this.logger.debug(
        `Updating profile picture metadata for user ${userId.toString()}`,
      );

      const existingProfilePicture =
        await this.assetRepository.findUserProfilePictureAsset(userId);

      if (!existingProfilePicture) {
        const errorMessage = `Profile picture not found for User with ID: ${userId.toString()}`;
        this.logger.error(errorMessage, null);
        throw new NotFoundException(errorMessage);
      }

      this.logger.debug(
        `Found existing profile picture for user ${userId.toString()}`,
      );

      existingProfilePicture.url = fileData.filePath;
      existingProfilePicture.mimetype = fileData.fileType;

      this.logger.debug(
        `Updating profile picture metadata: URL: ${fileData.filePath}, MIME type: ${fileData.fileType}`,
      );

      const updatedAsset = await this.assetRepository.saveAsset(
        existingProfilePicture,
      );

      this.logger.debug(
        `Successfully updated profile picture metadata for user ${userId.toString()}`,
      );

      return updatedAsset;
    } catch (error) {
      this.logger.error(
        'Failed to execute UpdateProfilePictureMetadataUseCase',
        error,
      );
      throw error;
    }
  }
}
