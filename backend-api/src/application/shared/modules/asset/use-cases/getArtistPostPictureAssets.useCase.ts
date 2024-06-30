import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';

@Injectable()
export class GetArtistPostPictureAssetsUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

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
