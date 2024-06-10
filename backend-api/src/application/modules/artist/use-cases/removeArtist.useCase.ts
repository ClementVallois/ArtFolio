import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { Repository } from 'typeorm';
import { ArtistId } from 'src/domain/value objects/artistId';
import { GetArtistByIdUseCase } from './getArtistById.useCase';

@Injectable()
export class RemoveArtistUseCase {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
  ) {}

  async execute(artistId: ArtistId): Promise<User> {
    const artist = await this.getArtistByIdUseCase.execute(artistId);

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
      return await this.userRepository.remove(artist);
    } catch (error) {
      console.error(`Failed to remove artist from database: ${error}`);
      throw new HttpException(
        'Failed to remove artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
