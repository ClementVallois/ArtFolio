import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from '../../presentation/asset/dto/create-asset.dto';
import { UpdateAssetDto } from '../../presentation/asset/dto/update-asset.dto';

@Injectable()
export class AssetService {
  create(createAssetDto: CreateAssetDto) {
    return 'This action adds a new asset';
  }

  findAll() {
    return `This action returns all asset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
