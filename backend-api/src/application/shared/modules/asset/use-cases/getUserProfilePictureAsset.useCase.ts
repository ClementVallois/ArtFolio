import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { UserId } from 'src/domain/value-objects/userId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

@Injectable()
export class GetUserProfilePictureAssetUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(userId: AmateurId | ArtistId | UserId): Promise<Asset | null> {
    try {
      this.logger.debug(
        `Fetching profile picture asset for user ${userId.toString()}`,
      );

      const userProfilePicture =
        await this.assetRepository.findUserProfilePictureAsset(userId);

      if (!userProfilePicture) {
        const errorMessage = `Profile picture asset not found for User with ID: ${userId.toString()}`;
        this.logger.warn(errorMessage);
        throw new NotFoundException(errorMessage);
      }

      this.logger.debug(
        `Successfully retrieved profile picture asset for user ${userId.toString()}`,
      );
      return userProfilePicture;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }

      this.logger.error(
        `Error fetching profile picture asset for user ${userId.toString()}`,
        error,
      );
      return null;
    }
  }
}
