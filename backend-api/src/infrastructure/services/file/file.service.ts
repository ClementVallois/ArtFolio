import { File } from '@nest-lab/fastify-multer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}
  async saveProfilePicture(file: File, artistId: string): Promise<string> {
    const cleanFilename = file.originalname.replace(/\s+/g, '_');
    const fileName = `${artistId}-${Date.now()}-${cleanFilename}`;
    const filePath = `${this.configService.get<string>('DEV_PROFILE_ASSETS_LOCATION')}/${fileName}`;
    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
  }

  // async deleteProfilePicture(fileName: string): Promise<void> {
  //   const filePath = `assets/profile_pictures/${fileName}`;
  //   await fs.promises.unlink(filePath);
  // }

  // async savePostPicture(file: File, postId: string): Promise<string> {
  //   const cleanFilename = file.originalname.replace(/\s+/g, '_');
  //   const fileName = `${artistId}-${Date.now()}-${cleanFilename}.${file.mimetype.split('/')[1]}`;
  //   const filePath = `assets/posts_pictures/${fileName}`;
  //   await fs.promises.writeFile(filePath, file.buffer);
  //   return fileName;
  // }

  // async deletePostPicture(fileName: string): Promise<void> {
  //   const filePath = `assets/posts_pictures/${fileName}`;
  //   await fs.promises.unlink(filePath);
  // }
}
