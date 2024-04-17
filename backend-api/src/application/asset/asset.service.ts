import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    if (!postAssets) {
      throw new NotFoundException(
        `Assets not found for Postwith ID: ${postId}`,
      );
    }
    return postAssets;
  }

  async getUserAssets(userId: string): Promise<Asset[]> {
    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }
    const userAssets = await this.assetRepository.find({
      where: { user: { id: userId } },
    });
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
