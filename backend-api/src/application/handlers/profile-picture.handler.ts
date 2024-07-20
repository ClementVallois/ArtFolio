import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { User } from 'src/domain/entities/user.entity';
import { UserId } from 'src/domain/value-objects/userId';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { GetUserProfilePictureAssetUseCase } from '../shared/modules/asset/use-cases/getUserProfilePictureAsset.useCase';

@Injectable()
export class ProfilePictureHandler {
  constructor(
    private readonly profilePictureService: ProfilePictureService,
    private readonly getUserProfilePictureAssetUseCase: GetUserProfilePictureAssetUseCase,
  ) {}

  async createOrUpdateProfilePicture(
    userData: User,
    profilePicture: File,
  ): Promise<void> {
    if (!profilePicture) return;

    const userId = new UserId(userData.id);
    const existingProfilePicture =
      await this.getUserProfilePictureAssetUseCase.execute(userId);

    if (existingProfilePicture) {
      await this.profilePictureService.deleteProfilePicture(userId);
    }

    try {
      const fileData = await this.profilePictureService.saveProfilePicture(
        userData.id,
        profilePicture,
      );
      await this.profilePictureService.addOrUpdateProfilePictureMetadata(
        userData,
        fileData,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to save profile picture',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProfilePicture(userId: UserId): Promise<void> {
    await this.profilePictureService.deleteProfilePicture(userId);
    await this.profilePictureService.removeProfilePictureMetadata(userId);
  }
}
