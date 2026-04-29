import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import * as fs from 'fs';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ValidationService } from 'src/application/validators/validation.service';
import { File } from '@nest-lab/fastify-multer';
import { CreateAmateurDto } from 'src/presentation/dto/amateur/create-amateur.dto';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class CreateAmateurUseCase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly validationService: ValidationService,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
    private readonly profilePictureService: ProfilePictureService,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    amateurData: CreateAmateurDto,
    files: { profilePicture: File },
  ): Promise<User> {
    await this.validationService.validateProfilePicture(files);

    const profilePictureFile = (files.profilePicture as unknown as File[])[0];

    // Save profile picture file before the transaction (no DB involved yet)
    const profilePicFileData =
      await this.profilePictureService.saveProfilePicture(
        amateurData.auth0Id,
        profilePictureFile,
      );

    try {
      return await this.dataSource.transaction(
        async (manager: EntityManager) => {
          const amateur = manager.create(User, amateurData);
          const savedAmateur = await manager.save(amateur);

          const profilePicAsset = manager.create(Asset, {
            url: profilePicFileData.filePath,
            mimetype: profilePicFileData.fileType,
            type: 'profile_picture',
            userId: savedAmateur,
          });
          await manager.save(profilePicAsset);

          return savedAmateur;
        },
      );
    } catch (error) {
      await this.cleanupFile(profilePicFileData.filePath);
      if (error?.code) {
        this.databaseErrorHandler.handleDatabaseError(error, amateurData);
      }
      throw error;
    }
  }

  private async cleanupFile(filePath: string): Promise<void> {
    try {
      await fs.promises.unlink(filePath);
    } catch {
      // Ignore cleanup errors. File may not have been written yet
    }
  }
}
