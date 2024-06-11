// profile-picture.handler.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { UserId } from 'src/domain/value objects/userId';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { GetUserProfilePictureUseCase } from '../modules/asset/use-cases/getUserProfilePicture.useCase';

@Injectable()
export class ProfilePictureHandler {
  constructor(
    private readonly fileService: FileService,
    private readonly profilePictureService: ProfilePictureService,
    private readonly getUserProfilePicture: GetUserProfilePictureUseCase,
  ) {}

  async handle(userData: User, profilePicture: File): Promise<void> {
    if (!profilePicture) return;

    const userId = new UserId(userData.id);
    const existingProfilePicture =
      await this.getUserProfilePicture.execute(userId);

    if (existingProfilePicture) {
      await this.fileService.deleteProfilePicture(userData.id);
    }

    try {
      const fileData = await this.fileService.saveProfilePicture(
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
}
