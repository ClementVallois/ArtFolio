import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class GetAllArtistsUseCase {
  private readonly CACHE_KEY = 'all_artists';
  private readonly CACHE_TTL = 10000;
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<User[]> {
    try {
      const cachedArtists = await this.cacheManager.get<User[]>(this.CACHE_KEY);
      if (cachedArtists) {
        this.logger.debug(
          `Retrieved ${cachedArtists.length} artists from cache`,
        );
        return cachedArtists;
      }

      const artists = await this.artistRepository.findAllByDescCreateDate();
      if (artists.length === 0) {
        throw new HttpException('No artists found', HttpStatus.NOT_FOUND);
      }
      this.logger.debug(`Found ${artists.length} posts from database`);
      await this.cacheManager.set(this.CACHE_KEY, artists, this.CACHE_TTL);

      return artists;
    } catch (error) {
      const errorMessage = `Error getting artists: ${error.message || error}`;
      this.logger.error(errorMessage, error);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
