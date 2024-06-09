// src/application/useCases/shared/profilePictureHandler.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from '../services/asset.service';

@Injectable()
export class ProfilePictureHandler {
  constructor(
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
  ) {}

  async handle(user: User, profilePicture: File | undefined): Promise<void> {
    if (!profilePicture) return;

    const existingProfilePicture =
      await this.assetService.getArtistProfilePicture(user.id);
    if (existingProfilePicture) {
      await this.fileService.deleteProfilePicture(user.id);
    }

    try {
      const fileData = await this.fileService.saveProfilePicture(
        user.id,
        profilePicture,
      );
      await this.assetService.addOrUpdateProfilePictureMetadata(user, fileData);
    } catch (error) {
      throw new HttpException(
        'Failed to save profile picture',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
