import { File } from '@nest-lab/fastify-multer';
import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { CreateAssetUseCase } from 'src/application/shared/modules/asset/use-cases/createAsset.useCase';
import { GetUserProfilePictureAssetUseCase } from 'src/application/shared/modules/asset/use-cases/getUserProfilePictureAsset.useCase';
import { RemoveAssetUseCase } from 'src/application/modules/asset/use-cases/removeAsset.useCase';
import { SaveAssetUseCase } from 'src/application/shared/modules/asset/use-cases/saveAsset.useCase';
import { GetUserByIdUseCase } from 'src/application/modules/user/use-cases/getUserById.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserId } from 'src/domain/value-objects/userId';
import { FileData } from 'src/infrastructure/common/types/file.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { FastifyReply } from 'fastify';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { join } from 'path';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { ArtistId } from 'src/domain/value-objects/artistId';

@Injectable()
export class ProfilePictureService {
  constructor(
    private readonly configService: ConfigService,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly saveAssetUseCase: SaveAssetUseCase,
    private readonly createAssetUseCase: CreateAssetUseCase,
    private readonly removeAssetUseCase: RemoveAssetUseCase,
    private readonly getUserProfilePictureAssetUseCase: GetUserProfilePictureAssetUseCase,
    private readonly logger: Logger,
  ) {}

  async saveProfilePicture(
    artistId: string,
    file: File,
  ): Promise<{
    filePath: string;
    fileType: string;
  }> {
    const profilePicture = file;

    const cleanFilename = profilePicture.originalname.replace(/\s+/g, '_');

    const fileName = `${artistId}-${Date.now()}-${cleanFilename}`;

    const fileType = file.mimetype;
    const filePath = `${this.configService.get<string>('DEV_PROFILE_ASSETS_LOCATION')}/${fileName}`;
    try {
      await fs.promises.writeFile(filePath, file.buffer);
    } catch (error) {
      throw new HttpException(
        'Error saving profile picture',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { filePath, fileType };
  }

  async addOrUpdateProfilePictureMetadata(
    userData: User,
    fileData: FileData,
  ): Promise<Asset> {
    const userId = new UserId(userData.id);
    const user = await this.getUserByIdUseCase.execute(userId);

    const existingProfilePicture =
      await this.getUserProfilePictureAssetUseCase.execute(userId);

    if (existingProfilePicture) {
      existingProfilePicture.url = fileData.filePath;
      existingProfilePicture.mimetype = fileData.fileType;
      return this.saveAssetUseCase.execute(existingProfilePicture);
    } else {
      return this.createAssetUseCase.execute({
        url: fileData.filePath,
        mimetype: fileData.fileType,
        type: 'profile_picture',
        userId: user,
      });
    }
  }

  @LogMethod(LogLevel.DEBUG)
  async streamUserAssets(
    userId: AmateurId | ArtistId,
    response: FastifyReply,
  ): Promise<StreamableFile> {
    this.logger.info(`Streaming user assets for userId: ${userId}`);
    try {
      const profilePictureAsset =
        await this.getUserProfilePictureAssetUseCase.execute(userId);

      if (!profilePictureAsset) {
        this.logger.warn(`No assets found for userId: ${userId}`);
        return;
      }

      const stream = fs.createReadStream(
        join(process.cwd(), profilePictureAsset.url),
      );

      response.headers({
        'Content-Disposition': `inline; filename="${profilePictureAsset.id}"`,
        'Content-Type': `${profilePictureAsset.mimetype}`,
      });

      this.logger.debug(`Streaming asset with id: ${profilePictureAsset.id}`);
      return new StreamableFile(stream);
    } catch (error) {
      this.logger.error(
        `Error streaming user assets for userId: ${userId}`,
        error,
      );
      throw error;
    }
  }

  async removeProfilePictureMetadata(userId: UserId): Promise<void> {
    const existingProfilePicture =
      await this.getUserProfilePictureAssetUseCase.execute(userId);
    if (existingProfilePicture) {
      await this.removeAssetUseCase.execute(existingProfilePicture);
    }
  }

  async deleteProfilePicture(id: UserId): Promise<void> {
    const userProfilePicture =
      await this.getUserProfilePictureAssetUseCase.execute(id);
    if (!userProfilePicture) {
      return;
    }

    try {
      await fs.promises.unlink(userProfilePicture.url);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('No such file or directory:', userProfilePicture.url);
        return;
      }
      throw new HttpException(
        'Error deleting profile picture',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
