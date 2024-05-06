import { File } from '@nest-lab/fastify-multer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly configService: ConfigService,
  ) {}
  async saveProfilePicture(
    file: File,
    artistId: string,
  ): Promise<{
    filePath: string;
    fileType: string;
  }> {
    const cleanFilename = file.originalname.replace(/\s+/g, '_');
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

  async deleteProfilePicture(artistId): Promise<void> {
    const userProfilePicture = await this.assetRepository.findOne({
      where: {
        userId: { id: artistId },
        type: 'profile_picture',
      },
    });
    if (!userProfilePicture) {
      return;
    }
    try {
      await fs.promises.unlink(userProfilePicture.url);
    } catch (error) {
      throw new HttpException(
        'Error deleting profile picture',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async savePostPicture(
    file: File,
    postId: string,
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

  async deletePostPicture(artistId): Promise<void> {
    const postProfilePicture = await this.assetRepository.findOne({
      where: {
        userId: { id: artistId },
        type: 'profile_picture',
      },
    });
    if (!postProfilePicture) {
      return;
    }
    try {
      await fs.promises.unlink(postProfilePicture.url);
    } catch (error) {
      throw new HttpException(
        'Error deleting profile picture',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
