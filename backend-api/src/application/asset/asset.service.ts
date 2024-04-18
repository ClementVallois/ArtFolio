import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}
  async getPostAssets(postId: string): Promise<Asset[]> {
    const postAssets = await this.assetRepository.find({
      where: { post: { id: postId } },
    });

    if (!postAssets || postAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for Post with ID: ${postId}`,
      );
    }
    return postAssets;
  }

  async getUserAssets(userId: string): Promise<Asset[]> {
    const userAssets = await this.assetRepository.find({
      where: { user: { id: userId } },
    });
    if (!userAssets || userAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for User with ID: ${userId}`,
      );
    }
    return userAssets;
  }

  // create(createAssetDto: CreateAssetDto) {
  //   return 'This action adds a new asset';
  // }

  // update(id: number, updateAssetDto: UpdateAssetDto) {
  //   return `This action updates a #${id} asset`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} asset`;
  // }
}
