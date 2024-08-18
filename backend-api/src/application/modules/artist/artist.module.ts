import { Module } from '@nestjs/common';
import { ArtistController } from '../../../presentation/controllers/artist.controller';
import { User as Artist } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetAllArtistsUseCase } from './use-cases/getAllArtists.useCase';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';
import { CreateArtistUseCase } from './use-cases/createArtist.useCase';
import { UpdateArtistUseCase } from './use-cases/updateArtist.useCase';
import { RemoveArtistUseCase } from './use-cases/removeArtist.useCase';
import { GetRandomArtistsPostUseCase } from './use-cases/getRandomArtistsPost.useCase';
import { GetLastRegisteredArtistsPostsUseCase } from './use-cases/getLastRegisteredArtistsPosts.useCase';
import { SharedCategoryModule } from 'src/application/shared/modules/category/shared-category.module';
import { SharedPostModule } from 'src/application/shared/modules/post/shared-post.module';
import { CommonModule } from 'src/application/common/common.module';
import { SharedArtistModule } from 'src/application/shared/modules/artist/shared-artist.module';
import { SharedAssetModule } from 'src/application/shared/modules/asset/shared-asset.module';
import { GetAllArtistsWithPinnedPostUseCase } from './use-cases/getAllArtistsWithPinnedPost.useCase';
import { SharedFileModule } from 'src/application/handlers/shared-file.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    CommonModule,
    SharedArtistModule,
    SharedAssetModule,
    SharedCategoryModule,
    SharedPostModule,
    SharedFileModule,
  ],
  controllers: [ArtistController],
  providers: [
    { provide: 'IArtistRepository', useClass: ArtistRepository },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    GetAllArtistsUseCase,
    CreateArtistUseCase,
    UpdateArtistUseCase,
    RemoveArtistUseCase,
    GetRandomArtistsPostUseCase,
    GetLastRegisteredArtistsPostsUseCase,
    GetAllArtistsWithPinnedPostUseCase,
  ],
  exports: [],
})
export class ArtistModule {}
