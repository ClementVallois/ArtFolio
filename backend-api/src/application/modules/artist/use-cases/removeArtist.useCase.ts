import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { GetArtistByIdUseCase } from './getArtistById.useCase';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';

@Injectable()
export class RemoveArtistUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly profilePictureHandler: ProfilePictureHandler,
    private readonly postPictureHandler: PostPictureHandler,
  ) {}

  async execute(artistId: ArtistId): Promise<User> {
    const artist = await this.getArtistByIdUseCase.execute(artistId);
    const userId = new UserId(artistId.toString());
    await this.profilePictureHandler.deleteProfilePicture(userId);
    await this.postPictureHandler.deleteArtistPostsPictures(artistId);

    try {
      return await this.artistRepository.removeArtist(artist);
    } catch (error) {
      console.error(`Failed to remove artist from database: ${error}`);
      throw new HttpException(
        'Failed to remove artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
