import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetUseCase } from 'src/application/modules/asset/use-cases/createAsset.useCase';
import { GetUserProfilePictureUseCase } from 'src/application/modules/asset/use-cases/getUserProfilePicture.useCase';
import { SaveAssetUseCase } from 'src/application/modules/asset/use-cases/saveAsset.useCase';
import { GetUserByIdUseCase } from 'src/application/modules/user/use-cases/getUserById.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserId } from 'src/domain/value objects/userId';
import { FileData } from 'src/infrastructure/common/types/file.interface';

@Injectable()
export class ProfilePictureService {
  constructor(
    private readonly getUserProfilePictureUseCase: GetUserProfilePictureUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly saveAssetUseCase: SaveAssetUseCase,
    private readonly createAssetUseCase: CreateAssetUseCase,
  ) {}

  async addOrUpdateProfilePictureMetadata(
    userData: User,
    fileData: FileData,
  ): Promise<Asset> {
    const userId = new UserId(userData.id);
    const user = await this.getUserByIdUseCase.execute(userId);
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${userId}`);
    }

    const existingProfilePicture =
      await this.getUserProfilePictureUseCase.execute(userId);

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
}
