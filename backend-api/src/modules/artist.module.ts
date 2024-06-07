import { Module } from '@nestjs/common';
import { ArtistController } from '../presentation/controllers/artist.controller';
import { ArtistService } from 'src/application/services/artist.service';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetService } from 'src/application/services/asset.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { CategoryService } from 'src/application/services/category.service';
import { PostService } from 'src/application/services/post.service';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { ValidationService } from '../application/validators/validation.service';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { Category } from 'src/domain/entities/category.entity';
import { PostUseCaseProxy } from 'src/application/proxies/postUseCase.proxy';
import { GetAllPostsUseCase } from 'src/application/useCases/post/getAllPosts.useCase';

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
    GetAllPostsUseCase,
    PostUseCaseProxy,
  ],
})
export class ArtistModule {}
