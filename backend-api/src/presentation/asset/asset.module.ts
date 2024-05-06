import { Module } from '@nestjs/common';
import { AssetService } from '../../application/asset/asset.service';
import { AssetController } from 'src/presentation/asset/asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Post } from 'src/infrastructure/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, User, Post])],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
