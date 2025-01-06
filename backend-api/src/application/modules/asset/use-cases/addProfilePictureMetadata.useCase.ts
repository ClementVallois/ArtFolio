import { Inject, Injectable } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { FileData } from 'src/infrastructure/common/types/file.interface';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class AddProfilePictureMetadataUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(userId: UserId, fileData: FileData): Promise<Asset> {
    const existingProfilePicture =
      await this.assetRepository.findUserProfilePictureAsset(userId);
    if (existingProfilePicture) {
      existingProfilePicture.url = fileData.filePath;
      existingProfilePicture.mimetype = fileData.fileType;
      return this.assetRepository.saveAsset(existingProfilePicture);
    }
  }
}
