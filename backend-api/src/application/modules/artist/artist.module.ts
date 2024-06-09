import { Module } from '@nestjs/common';
import { ArtistController } from '../../../presentation/controllers/artist.controller';
import { ArtistService } from 'src/application/services/artist.service';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetService } from 'src/application/services/asset.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { CategoryService } from 'src/application/services/category.service';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { ValidationService } from '../../validators/validation.service';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { Category } from 'src/domain/entities/category.entity';
import { SharedPostModule } from 'src/application/shared/modules/post/shared-post.module';
import { ArtistUseCaseProxy } from './proxies/artistUseCase.proxy';
import { SharedArtistModule } from 'src/application/shared/modules/artist/shared-artist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Asset, Category]),
    SharedPostModule,
    SharedArtistModule,
  ],
  controllers: [ArtistController],
  providers: [
    ArtistUseCaseProxy,
    AssetService,
    FileService,
    CategoryService,
    ErrorService,
    ValidationService,
  ],
})
export class ArtistModule {}
