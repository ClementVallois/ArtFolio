import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { Category } from 'src/infrastructure/entities/category.entity';
import { Post } from 'src/infrastructure/entities/post.entity';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { DataRequest } from 'src/infrastructure/entities/data-request.entity';
import { PostSeederService } from './post.seeder.service';
import { UserSeederService } from './user.seeder.service';
import { AssetSeederService } from './asset.seeder.service';
import { CategorySeederService } from './category.seeder.service';
import { DataRequestSeederService } from './data-request.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Post, Asset, DataRequest]),
  ],
  controllers: [],
  providers: [
    PostSeederService,
    UserSeederService,
    AssetSeederService,
    CategorySeederService,
    DataRequestSeederService,
  ],
  exports: [
    PostSeederService,
    UserSeederService,
    AssetSeederService,
    CategorySeederService,
    DataRequestSeederService,
  ],
})
export class SeederModule {}
