import { Inject, Injectable } from '@nestjs/common';
import { GetArtistPinnedPostUseCase } from 'src/application/shared/modules/post/use-cases/getArtistPinnedPost.useCase';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User as Artist } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { GetPostAssetsUseCase } from '../../../shared/modules/asset/use-cases/getPostAssets.useCase';
import { PostId } from 'src/domain/value-objects/postId';
import { GetUserProfilePictureAssetUseCase } from '../../../shared/modules/asset/use-cases/getUserProfilePictureAsset.useCase';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

@Injectable()
export class GetAllArtistsWithPinnedPostUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly getUserProfilePictureAssetUseCase: GetUserProfilePictureAssetUseCase,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<
    {
      artist: Artist;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    try {
      this.logger.debug('Fetching all artists');
      const allArtists = await this.artistRepository.findAllArtists();
      this.logger.debug(`Found ${allArtists.length} artists`);

      const artistWithPostsList: {
        artist: Artist;
        pinnedPost: Post;
        postAssets: Asset[];
        artistAsset: Asset;
      }[] = [];

      for (const artist of allArtists) {
        const artistId = new ArtistId(artist.id);
        this.logger.debug(`Processing artist with ID: ${artistId.toString()}`);

        const pinnedPost =
          await this.getArtistPinnedPostUseCase.execute(artistId);
        this.logger.debug(
          `Found pinned post for artist ${artistId.toString()}`,
        );

        const postAssets = await this.getPostAssetsUseCase.execute(
          new PostId(pinnedPost.id),
        );
        this.logger.debug(
          `Retrieved ${postAssets.length} assets for post ${pinnedPost.id}`,
        );

        const artistAsset =
          await this.getUserProfilePictureAssetUseCase.execute(artistId);
        this.logger.debug(
          `Retrieved profile picture for artist ${artistId.toString()}`,
        );

        artistWithPostsList.push({
          artist,
          pinnedPost,
          postAssets: postAssets,
          artistAsset: artistAsset,
        });
      }

      this.logger.debug(
        `Successfully processed ${artistWithPostsList.length} artists with their posts and assets`,
      );
      return artistWithPostsList;
    } catch (error) {
      this.logger.error(
        'Failed to execute GetAllArtistsWithPinnedPostUseCase',
        error,
      );
      throw error;
    }
  }
}
