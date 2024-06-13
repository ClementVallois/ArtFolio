import { File } from '@nest-lab/fastify-multer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { GetArtistPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getArtistPostPictureAssets.useCase';
import { GetPostPictureAssetsUseCase } from 'src/application/modules/asset/use-cases/getPostPictureAssets.useCase';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { PostId } from 'src/domain/value-objects/postId';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    private readonly getPostPictureAssetsUseCase: GetPostPictureAssetsUseCase,
    private readonly getArtistPostPictureAssetsUseCase: GetArtistPostPictureAssetsUseCase,
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
