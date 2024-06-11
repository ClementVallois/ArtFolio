import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AssetService } from 'src/application/services/asset.service';
import { GetArtistPinnedPostUseCase } from 'src/application/shared/modules/post/use-cases/getArtistPinnedPost.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ArtistId } from 'src/domain/value objects/artistId';

@Injectable()
export class GetLastRegisteredArtistsPostsUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly assetService: AssetService,
  ) {}

  async execute(numberOfPosts: number): Promise<
    {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    const lastRegisteredArtists =
      await this.artistRepository.findLastRegisteredArtists(numberOfPosts);

    if (lastRegisteredArtists.length < numberOfPosts) {
      throw new NotFoundException(
        `Expected ${numberOfPosts} artists, but found ${lastRegisteredArtists.length}`,
      );
    }

    const artistWithPostsList: {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[] = [];

    for (const artist of lastRegisteredArtists) {
      const artistId = new ArtistId(artist.id);
      const pinnedPost =
        await this.getArtistPinnedPostUseCase.execute(artistId);
      const postAssets = await this.assetService.getPostAssets(pinnedPost.id);

      const artistAsset =
        await this.assetService.getUserProfilePicture(artistId);

      artistWithPostsList.push({
        artist,
        pinnedPost,
        postAssets: postAssets,
        artistAsset: artistAsset,
      });
    }

    return artistWithPostsList;
  }
}
