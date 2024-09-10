import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { Asset } from 'src/domain/entities/asset.entity';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class CreateAssetUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(assetData: Partial<Asset>): Promise<Asset> {
    let assetToCreate: Asset;
    try {
      assetToCreate = await this.assetRepository.createAsset(assetData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return assetToCreate;
  }
}
