import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Asset } from 'src/domain/entities/asset.entity';
import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
import { PostId } from 'src/domain/value-objects/postId';

@Injectable()
export class GetPostPictureAssetsUseCase {
  constructor(
    @Inject('IAssetRepository')
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(postId: PostId): Promise<Asset[]> {
    const postPictureAssets =
      await this.assetRepository.findPostPictureAssets(postId);

    if (!postPictureAssets || postPictureAssets.length === 0) {
      throw new NotFoundException(
        `Post picture assets not found for Post with ID: ${postId}`,
      );
    }
    return postPictureAssets;
  }
}
