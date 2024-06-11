import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { Post } from 'src/domain/entities/post.entity';
import { AssetRepository } from 'src/infrastructure/repositories/asset.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, User, Post])],
  controllers: [],
  providers: [{ provide: 'IAssetRepository', useClass: AssetRepository }],
})
export class AssetModule {}
