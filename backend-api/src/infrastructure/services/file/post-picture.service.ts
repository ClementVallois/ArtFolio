import { File } from '@nest-lab/fastify-multer';
import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { GetArtistByIdUseCase } from 'src/application/shared/modules/artist/use-cases/getArtistById.useCase';
import { CreateAssetUseCase } from 'src/application/shared/modules/asset/use-cases/createAsset.useCase';
import { GetArtistPostPictureAssetsUseCase } from 'src/application/shared/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetPostPictureAssetsUseCase } from 'src/application/shared/modules/asset/use-cases/getPostPictureAssets.useCase';
import { RemoveAssetUseCase } from 'src/application/modules/asset/use-cases/removeAsset.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { PostId } from 'src/domain/value-objects/postId';
import { FileData } from 'src/infrastructure/common/types/file.interface';
import { FastifyReply } from 'fastify';
import { GetPostAssetsUseCase } from 'src/application/shared/modules/asset/use-cases/getPostAssets.useCase';
import { join } from 'path';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { GetPostByIdUseCase } from 'src/application/modules/post/use-cases/getPostById.useCase';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class PostPictureService {
  constructor(
    private readonly configService: ConfigService,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly createAssetUseCase: CreateAssetUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly getPostPictureAssetsUseCase: GetPostPictureAssetsUseCase,
    private readonly getArtistPostPictureAssetsUseCase: GetArtistPostPictureAssetsUseCase,
    private readonly getPostPictureAssetUseCase: GetPostPictureAssetsUseCase,
    private readonly removeAssetUseCase: RemoveAssetUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async savePostPicture(
    postId: string,
    file: File,
  ): Promise<{
    filePath: string;
    fileType: string;
  }> {
    const cleanFilename = file.originalname.replace(/\s+/g, '_');
    const fileName = `${postId}-${Date.now()}-${cleanFilename}`;
    const fileType = file.mimetype;
    const filePath = `${this.configService.get<string>('DEV_POST_ASSETS_LOCATION')}/${fileName}`;

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

  @LogMethod(LogLevel.DEBUG)
  async addPostPictureMetadata(
    postId: PostId,
    artistId: ArtistId,
    fileData: FileData,
  ): Promise<Asset> {
    try {
      const post = await this.getPostByIdUseCase.execute(postId);
      const artist = await this.getArtistByIdUseCase.execute(artistId);

      const assetToCreate = {
        url: fileData.filePath,
        mimetype: fileData.fileType,
        type: 'post_picture',
        postId: post,
        userId: artist,
      };

      const createdAsset = await this.createAssetUseCase.execute(assetToCreate);
      this.logger.debug(`Created asset with id: ${createdAsset.id}`);
      return createdAsset;
    } catch (error) {
      throw new HttpException(
        'Error adding post picture metadata',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @LogMethod(LogLevel.DEBUG)
  async streamPostAssets(
    postId: PostId,
    response: FastifyReply,
  ): Promise<StreamableFile> {
    this.logger.info(`Streaming post assets for postId: ${postId}`);

    try {
      const postAssets = await this.getPostAssetsUseCase.execute(postId);

      if (!postAssets || postAssets.length === 0) {
        this.logger.warn(`No assets found for postId: ${postId}`);
        return;
      }

      const asset = postAssets[0];
      const stream = fs.createReadStream(join(process.cwd(), asset.url));

      response.headers({
        'Content-Disposition': `inline; filename="${asset.id}"`,
        'Content-Type': `${asset.mimetype}`,
      });

      this.logger.debug(`Streaming asset with id: ${asset.id}`);
      return new StreamableFile(stream);
    } catch (error) {
      this.logger.error(
        `Error streaming post assets for postId: ${postId}`,
        error,
      );
      throw error;
    }
  }

  @LogMethod(LogLevel.DEBUG)
  async removePostPictureMetadata(postId: PostId): Promise<void> {
    this.logger.info(`Removing post picture metadata for postId: ${postId}`);

    try {
      const existingPostPicture =
        await this.getPostPictureAssetUseCase.execute(postId);
      if (existingPostPicture) {
        for (const asset of existingPostPicture) {
          await this.removeAssetUseCase.execute(asset);
        }
        this.logger.debug(
          `Removed post picture metadata for postId: ${postId}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error removing post picture metadata for postId: ${postId}`,
        error,
      );
      throw error;
    }
  }

  @LogMethod(LogLevel.DEBUG)
  async deletePostsPictures(postId: PostId): Promise<void> {
    this.logger.info(`Deleting post pictures for postId: ${postId}`);

    try {
      const postPictures =
        await this.getPostPictureAssetsUseCase.execute(postId);

      if (!postPictures) {
        this.logger.warn(`No post pictures found for postId: ${postId}`);
        return;
      }

      for (const postPicture of postPictures) {
        await fs.promises.unlink(postPicture.url);
      }
      this.logger.debug(`Deleted post pictures for postId: ${postId}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.logger.error(
          `No such file or directory for postId: ${postId}`,
          error,
        );
        throw new HttpException(
          'Error deleting post picture : No such file or directory',
          HttpStatus.BAD_REQUEST,
        );
      }
      this.logger.error(
        `Error deleting post pictures for postId: ${postId}`,
        error,
      );
      throw new HttpException(
        'Error deleting post picture',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @LogMethod(LogLevel.DEBUG)
  async deleteArtistPostsPictures(artistId: ArtistId): Promise<void> {
    this.logger.info(
      `Deleting artist posts pictures for artistId: ${artistId}`,
    );

    try {
      const postPictures =
        await this.getArtistPostPictureAssetsUseCase.execute(artistId);

      if (!postPictures) {
        this.logger.warn(`No post pictures found for artistId: ${artistId}`);
        return;
      }

      for (const postPicture of postPictures) {
        await fs.promises.unlink(postPicture.url);
      }
      this.logger.debug(
        `Deleted artist posts pictures for artistId: ${artistId}`,
      );
    } catch (error) {
      this.logger.error(
        `Error deleting artist posts pictures for artistId: ${artistId}`,
        error,
      );
      throw new HttpException(
        'Error deleting posts pictures',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
