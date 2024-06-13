import { Inject, Injectable } from '@nestjs/common';
import { GetArtistPinnedPostUseCase } from 'src/application/shared/modules/post/use-cases/getArtistPinnedPost.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { GetPostAssetsUseCase } from '../../asset/use-cases/getPostAssets.useCase';
import { PostId } from 'src/domain/value-objects/postId';
import { GetUserProfilePictureAssetUseCase } from '../../asset/use-cases/getUserProfilePictureAsset.useCase';

@Injectable()
export class GetRandomArtistsPostUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly getUserProfilePictureAssetUseCase: GetUserProfilePictureAssetUseCase,
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
