import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';

@Injectable()
export class GetAllArtistsUseCase {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async execute(): Promise<User[]> {
    try {
      return await this.artistRepository.findAllByDescCreateDate();
    } catch (error) {
      throw new HttpException(
        `Error getting artists : ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
