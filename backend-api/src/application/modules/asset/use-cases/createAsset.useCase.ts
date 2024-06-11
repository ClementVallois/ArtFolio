import { Inject, Injectable } from '@nestjs/common';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { Asset } from 'src/domain/entities/asset.entity';

@Injectable()
export class CreateAssetUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(assetData: Partial<Asset>): Promise<Asset> {
    let assetToCreate: Asset;
    try {
      assetToCreate = await this.assetRepository.createAsset(assetData);
    } catch (error) {
      throw new Error(error);
    }
    return assetToCreate;
  }
}
