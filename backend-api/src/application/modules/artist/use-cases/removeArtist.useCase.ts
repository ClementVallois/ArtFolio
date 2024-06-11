import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { ArtistId } from 'src/domain/value objects/artistId';
import { GetArtistByIdUseCase } from './getArtistById.useCase';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';

@Injectable()
export class RemoveArtistUseCase {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly fileService: FileService,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
  ) {}

  async execute(id: ArtistId): Promise<User> {
    const artistId = id.toString();
    const artist = await this.getArtistByIdUseCase.execute(id);
    try {
      await this.fileService.deleteProfilePicture(artistId);
      await this.fileService.deleteUserPostsPictures(artistId);
    } catch (error) {
      throw new HttpException(
        "Failed to remove the artist's profile picture",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      return await this.artistRepository.remove(artist);
    } catch (error) {
      console.error(`Failed to remove artist from database: ${error}`);
      throw new HttpException(
        'Failed to remove artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
