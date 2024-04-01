import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from '../../infrastructure/controllers/asset/asset.controller';

@Module({
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
