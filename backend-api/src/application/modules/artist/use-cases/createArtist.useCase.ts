import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import * as fs from 'fs';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { Category } from 'src/domain/entities/category.entity';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ValidationService } from 'src/application/validators/validation.service';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { FileUploadDto } from 'src/presentation/dto/artist/fileUpload.dto';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { PostPictureService } from 'src/infrastructure/services/file/post-picture.service';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class CreateArtistUseCase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly validationService: ValidationService,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
    private readonly profilePictureService: ProfilePictureService,
    private readonly postPictureService: PostPictureService,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    artistData: CreateArtistDto,
    files: FileUploadDto,
  ): Promise<User> {
    await this.validationService.validateArtistCategories(artistData);
    await this.validationService.validateProfilePicture(files);
    await this.validationService.validatePostPicture(files);

    const profilePictureFile = files.profilePicture[0];
    const postPictureFile = files.postPicture[0];

    // Save profile picture file before the transaction (no DB involved yet)
    const profilePicFileData =
      await this.profilePictureService.saveProfilePicture(
        artistData.auth0Id,
        profilePictureFile,
      );
    const savedFilePaths: string[] = [profilePicFileData.filePath];

    try {
      return await this.dataSource.transaction(
        async (manager: EntityManager) => {
          // Extract only User entity fields from the DTO
          const { post, category, ...userFields } = artistData;

          const artist = manager.create(User, userFields);
          const savedArtist = await manager.save(artist);

          const profilePicAsset = manager.create(Asset, {
            url: profilePicFileData.filePath,
            mimetype: profilePicFileData.fileType,
            type: 'profile_picture',
            userId: savedArtist,
          });
          await manager.save(profilePicAsset);

          const postEntity = manager.create(Post, {
            isPinned: post.isPinned,
            description: post.description,
            user: savedArtist,
          });
          const savedPost = await manager.save(postEntity);

          // Save post picture file inside the callback to use savedPost.id in the filename
          const postPicFileData = await this.postPictureService.savePostPicture(
            savedPost.id,
            postPictureFile,
          );
          savedFilePaths.push(postPicFileData.filePath);

          const postPicAsset = manager.create(Asset, {
            url: postPicFileData.filePath,
            mimetype: postPicFileData.fileType,
            type: 'post_picture',
            postId: savedPost,
            userId: savedArtist,
          });
          await manager.save(postPicAsset);

          for (const categoryId of category.categories) {
            const categoryEntity = await manager.findOne(Category, {
              where: { id: categoryId },
            });
            if (!categoryEntity) {
              throw new NotFoundException(`Category ${categoryId} not found`);
            }
            categoryEntity.user = [savedArtist];
            await manager.save(categoryEntity);
          }

          return savedArtist;
        },
      );
    } catch (error) {
      await this.cleanupFiles(savedFilePaths);
      if (error?.code) {
        this.databaseErrorHandler.handleDatabaseError(error, artistData);
      }
      throw error;
    }
  }

  private async cleanupFiles(filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      try {
        await fs.promises.unlink(filePath);
      } catch {
        // Ignore cleanup errors. File may not have been written yet
      }
    }
  }
}
