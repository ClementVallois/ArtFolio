import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetArtistPostPictureAssetsUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(artistId: ArtistId): Promise<Asset[]> {
    const postPictureAssets =
      await this.assetRepository.findArtistPostPictureAssets(artistId);

    if (!postPictureAssets || postPictureAssets.length === 0) {
      throw new NotFoundException(
        `Post picture assets not found for Artist with ID: ${artistId}`,
      );
    }
    return postPictureAssets;
  }
}
