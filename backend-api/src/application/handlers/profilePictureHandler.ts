import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from '../services/asset.service';
import { ArtistId } from 'src/domain/value objects/artistId';

@Injectable()
export class ProfilePictureHandler {
  constructor(
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
  ) {}

  async handle(
    artistData: User,
    profilePicture: File | undefined,
  ): Promise<void> {
    if (!profilePicture) return;
    const artistId = new ArtistId(artistData.id);
    const existingProfilePicture =
      await this.assetService.getArtistProfilePicture(artistId);
    if (existingProfilePicture) {
      await this.fileService.deleteProfilePicture(artistId);
    }

    try {
      const fileData = await this.fileService.saveProfilePicture(
        artistData.id,
        profilePicture,
      );
      await this.assetService.addOrUpdateProfilePictureMetadata(
        artistData,
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
