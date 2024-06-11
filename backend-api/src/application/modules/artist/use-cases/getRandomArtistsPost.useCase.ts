import { Injectable } from '@nestjs/common';
import { AssetService } from 'src/application/services/asset.service';
import { GetArtistPinnedPostUseCase } from 'src/application/shared/modules/post/use-cases/getArtistPinnedPost.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value objects/artistId';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';

@Injectable()
export class GetRandomArtistsPostUseCase {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly assetService: AssetService,
  ) {}

  async execute(numberOfArtists: number): Promise<
    {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    const randomArtists = await this.artistRepository.findAllArtists();

    const artistsInDB = randomArtists.length;
    const selectedArtists: {
      artist: User;
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
      const postAssets = await this.assetService.getPostAssets(pinnedPost.id);

      const artistAsset =
        await this.assetService.getUserProfilePicture(artistId);

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
