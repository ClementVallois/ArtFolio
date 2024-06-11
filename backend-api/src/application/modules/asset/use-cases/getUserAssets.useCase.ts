import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { UserId } from 'src/domain/value objects/userId';

@Injectable()
export class GetUserAssetsUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(userId: UserId): Promise<Asset[]> {
    const userAssets = await this.assetRepository.findUserAssets(userId);
    if (!userAssets || userAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for User with ID: ${userId}`,
      );
    }
    return userAssets;
  }
}
