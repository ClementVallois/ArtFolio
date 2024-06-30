import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

@Injectable()
export class GetAllArtistsUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<User[]> {
    try {
      this.logger.debug(
        'Fetching all artists sorted by descending creation date',
      );

      const artists = await this.artistRepository.findAllByDescCreateDate();

      this.logger.debug(`Successfully retrieved ${artists.length} artists`);

      return artists;
    } catch (error) {
      const errorMessage = `Error getting artists: ${error.message || error}`;
      this.logger.error(errorMessage, error);

      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
