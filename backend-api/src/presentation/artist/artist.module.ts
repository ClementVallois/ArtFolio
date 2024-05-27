import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from 'src/application/artist/artist.service';
import { User } from 'src/infrastructure/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/infrastructure/entities/post.entity';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { Category } from 'src/infrastructure/entities/category.entity';
import { AssetService } from 'src/application/asset/asset.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { CategoryService } from 'src/application/category/category.service';
import { PostService } from 'src/application/post/post.service';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { ValidationService } from '../utils/validators/validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Asset, Category])],
  controllers: [ArtistController],
  providers: [
    ArtistService,
    AssetService,
    FileService,
    CategoryService,
    PostService,
    ErrorService,
    ValidationService,
  ],
})
export class ArtistModule {}
