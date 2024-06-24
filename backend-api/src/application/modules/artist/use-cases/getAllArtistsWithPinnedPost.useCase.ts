import { Inject, Injectable } from '@nestjs/common';
import { GetArtistPinnedPostUseCase } from 'src/application/shared/modules/post/use-cases/getArtistPinnedPost.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { GetPostAssetsUseCase } from '../../../shared/modules/asset/use-cases/getPostAssets.useCase';
import { PostId } from 'src/domain/value-objects/postId';
import { GetUserProfilePictureAssetUseCase } from '../../../shared/modules/asset/use-cases/getUserProfilePictureAsset.useCase';

@Injectable()
export class GetAllArtistsWithPinnedPostUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly getUserProfilePictureAssetUseCase: GetUserProfilePictureAssetUseCase,
  ) {}

  async execute(): Promise<
    {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    const allArtists = await this.artistRepository.findAllArtists();

    const artistWithPostsList: {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[] = [];

    for (const artist of allArtists) {
      const artistId = new ArtistId(artist.id);
      const pinnedPost =
        await this.getArtistPinnedPostUseCase.execute(artistId);
      const postAssets = await this.getPostAssetsUseCase.execute(
        new PostId(pinnedPost.id),
      );

      const artistAsset =
        await this.getUserProfilePictureAssetUseCase.execute(artistId);

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
