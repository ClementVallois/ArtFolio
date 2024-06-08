import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { PostId } from 'src/domain/value objects/postId';
import { Repository } from 'typeorm';

@Injectable()
export class GetPostAssetsUseCase {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async execute(postId: PostId): Promise<Asset[]> {
    const postAssets = await this.assetRepository.find({
      where: { postId: { id: postId.toString() }, type: 'post_picture' },
    });

    if (!postAssets || postAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for Post with ID: ${postId}`,
      );
    }
    return postAssets;
  }
}
