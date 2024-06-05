import { Module } from '@nestjs/common';
import { PostService } from '../application/services/post.service';
import { PostController } from 'src/presentation/controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from 'src/application/services/asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Asset, User])],
  controllers: [PostController],
  providers: [PostService, FileService, AssetService],
})
export class PostModule {}
