import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User as Artist } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { GetArtistByIdUseCase } from '../../../shared/modules/artist/use-cases/getArtistById.useCase';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

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

  async execute(artistId: ArtistId): Promise<Artist> {
    const artist = await this.getArtistByIdUseCase.execute(artistId);
    const userId = new UserId(artistId.toString());
    await this.profilePictureHandler.deleteProfilePicture(userId);
    await this.postPictureHandler.deleteArtistPostsPictures(artistId);

    try {
      return await this.artistRepository.removeArtist(artist);
    } catch (error) {
      this.logger.error(
        `Failed to remove artist from database: ${error}`,
        error,
      );
      throw new HttpException(
        'Failed to remove artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
