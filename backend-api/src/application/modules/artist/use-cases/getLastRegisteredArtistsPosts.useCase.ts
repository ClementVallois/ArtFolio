import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class GetLastRegisteredArtistsPostsUseCase {
  private readonly CACHE_KEY = 'last_registered_artists_posts';
  private readonly CACHE_TTL = 60000;

  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly getUserProfilePictureAssetUseCase: GetUserProfilePictureAssetUseCase,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(numberOfPosts: number): Promise<
    {
      artist: Artist;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    try {
      // Check if data is cached
      const cachedData = await this.cacheManager.get<
        {
          artist: Artist;
          pinnedPost: Post;
          postAssets: Asset[];
          artistAsset: Asset;
        }[]
      >(this.CACHE_KEY);

      if (cachedData) {
        this.logger.debug(
          `Retrieved ${cachedData.length} artists' posts from cache`,
        );
        return cachedData;
      }

      this.logger.debug(`Fetching ${numberOfPosts} last registered artists`);
      const lastRegisteredArtists =
        await this.artistRepository.findLastRegisteredArtists(numberOfPosts);

      if (lastRegisteredArtists.length < numberOfPosts) {
        const errorMessage = `Expected ${numberOfPosts} artists, but found ${lastRegisteredArtists.length}`;
        this.logger.error(errorMessage, null);
        throw new NotFoundException(errorMessage);
      }

      this.logger.debug(`Found ${lastRegisteredArtists.length} artists`);

      const artistWithPostsList: {
        artist: Artist;
        pinnedPost: Post;
        postAssets: Asset[];
        artistAsset: Asset;
      }[] = [];

      for (const artist of lastRegisteredArtists) {
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

      // Store the result in the cache
      await this.cacheManager.set(
        this.CACHE_KEY,
        artistWithPostsList,
        this.CACHE_TTL,
      );

      return artistWithPostsList;
    } catch (error) {
      this.logger.error(
        'Failed to execute GetLastRegisteredArtistsPostsUseCase',
        error,
      );
      throw error;
    }
  }
}
