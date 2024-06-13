import { File } from '@nest-lab/fastify-multer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { GetArtistByIdUseCase } from 'src/application/modules/artist/use-cases/getArtistById.useCase';
import { CreateAssetUseCase } from 'src/application/modules/asset/use-cases/createAsset.useCase';
import { GetArtistPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getPostPictureAssets.useCase';
import { RemoveAssetUseCase } from 'src/application/modules/asset/use-cases/removeAsset.useCase';
import { GetPostByIdUseCase } from 'src/application/modules/post/use-cases/getPostById.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { PostId } from 'src/domain/value-objects/postId';
import { FileData } from 'src/infrastructure/common/types/file.interface';

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
  ) {}

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

  async addPostPictureMetadata(
    postId: PostId,
    artistId: ArtistId,
    fileData: FileData,
  ): Promise<Asset> {
    const post = await this.getPostByIdUseCase.execute(postId);
    const artist = await this.getArtistByIdUseCase.execute(artistId);

    const assetToCreate = {
      url: fileData.filePath,
      mimetype: fileData.fileType,
      type: 'post_picture',
      postId: post,
      userId: artist,
    };

    return this.createAssetUseCase.execute(assetToCreate);
  }

  async removePostPictureMetadata(postId: PostId): Promise<void> {
    const existingPostPicture =
      await this.getPostPictureAssetUseCase.execute(postId);
    if (existingPostPicture) {
      for (const asset of existingPostPicture) {
        await this.removeAssetUseCase.execute(asset);
      }
    }
  }

  async deletePostsPictures(postId: PostId): Promise<void> {
    const postPictures = await this.getPostPictureAssetsUseCase.execute(postId);

    if (!postPictures) {
      return;
    }
    try {
      for (const postPicture of postPictures) {
        await fs.promises.unlink(postPicture.url);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new HttpException(
          'Error deleting post picture : No such file or directory',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Error deleting post picture',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteArtistPostsPictures(artistId: ArtistId): Promise<void> {
    const postPictures =
      await this.getArtistPostPictureAssetsUseCase.execute(artistId);

    if (!postPictures) {
      return;
    }
    try {
      for (const postPicture of postPictures) {
        await fs.promises.unlink(postPicture.url);
      }
    } catch (error) {
      throw new HttpException(
        'Error deleting posts pictures',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
