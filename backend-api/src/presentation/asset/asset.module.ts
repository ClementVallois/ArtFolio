import { Module } from '@nestjs/common';
import { AssetService } from '../../application/asset/asset.service';
import { AssetController } from 'src/presentation/asset/asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { User } from 'src/infrastructure/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, User])],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
