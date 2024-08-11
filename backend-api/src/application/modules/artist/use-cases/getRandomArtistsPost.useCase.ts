import { Injectable } from '@nestjs/common';
import { GetArtistPinnedPostUseCase } from 'src/application/shared/modules/post/use-cases/getArtistPinnedPost.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User as Artist } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { GetPostAssetsUseCase } from '../../../shared/modules/asset/use-cases/getPostAssets.useCase';
import { PostId } from 'src/domain/value-objects/postId';
import { GetUserProfilePictureAssetUseCase } from '../../../shared/modules/asset/use-cases/getUserProfilePictureAsset.useCase';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { GetAllArtistsUseCase } from './getAllArtists.useCase';

@Injectable()
export class GetRandomArtistsPostUseCase {
  constructor(
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly getAllArtistsUseCase: GetAllArtistsUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly getUserProfilePictureAssetUseCase: GetUserProfilePictureAssetUseCase,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(numberOfArtists: number): Promise<
    {
      artist: Artist;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    const randomArtists = await this.getAllArtistsUseCase.execute();

    const artistsInDB = randomArtists.length;
    const selectedArtists: {
      artist: Artist;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[] = [];

    for (let i = 0; i < numberOfArtists; i++) {
      const randomIndex = Math.floor(Math.random() * artistsInDB);
      const randomArtist = randomArtists[randomIndex];
      const artistId = new ArtistId(randomArtist.id);
      const pinnedPost =
        await this.getArtistPinnedPostUseCase.execute(artistId);
      const postAssets = await this.getPostAssetsUseCase.execute(
        new PostId(pinnedPost.id),
      );

      const artistAsset =
        await this.getUserProfilePictureAssetUseCase.execute(artistId);

      selectedArtists.push({
        artist: randomArtist,
        pinnedPost: pinnedPost,
        postAssets: postAssets,
        artistAsset: artistAsset,
      });
    }

    return selectedArtists;
  }
}
