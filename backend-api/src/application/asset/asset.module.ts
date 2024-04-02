import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from 'src/presentation/asset/asset.controller';

@Module({
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
