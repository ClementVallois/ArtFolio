import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Category } from 'src/domain/entities/category.entity';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { PostSeederService } from './seeders/post.seeder.service';
import { UserSeederService } from './seeders/user.seeder.service';
import { AssetSeederService } from './seeders/asset.seeder.service';
import { CategorySeederService } from './seeders/category.seeder.service';
import { DataRequestSeederService } from './seeders/data-request.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Category,
      Post,
      Asset,
      PersonalDataRequest,
    ]),
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
