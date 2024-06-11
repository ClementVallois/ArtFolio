import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';

@Injectable()
export class GetAllArtistsUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
  ) {}

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
