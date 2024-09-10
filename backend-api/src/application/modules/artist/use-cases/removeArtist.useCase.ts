import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User as Artist } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { GetArtistByIdUseCase } from '../../../shared/modules/artist/use-cases/getArtistById.useCase';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class RemoveArtistUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly profilePictureHandler: ProfilePictureHandler,
    private readonly postPictureHandler: PostPictureHandler,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(artistId: ArtistId): Promise<Artist> {
    let artist: Artist;

    try {
      artist = await this.getArtistByIdUseCase.execute(artistId);
    } catch (error) {
      this.logger.error(`Failed to get artist: ${error.message}`, error);
      throw new HttpException('Failed to get artist', HttpStatus.NOT_FOUND);
    }

    const userId = new UserId(artistId.toString());

    try {
      await this.profilePictureHandler.deleteProfilePicture(userId);
    } catch (error) {
      this.logger.error(
        `Failed to delete profile picture: ${error.message}`,
        error,
      );
    }

    try {
      await this.postPictureHandler.deleteArtistPostsPictures(artistId);
    } catch (error) {
      this.logger.error(
        `Failed to delete artist posts pictures: ${error.message}`,
        error,
      );
    }

    try {
      await this.artistRepository.removeArtist(artist);
    } catch (error) {
      this.logger.error(
        `Failed to remove artist from database: ${error.message}`,
        error,
      );
      throw new HttpException(
        'Failed to remove artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return artist;
  }
}
