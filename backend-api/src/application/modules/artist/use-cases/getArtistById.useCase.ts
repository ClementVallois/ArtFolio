import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value objects/artistId';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';

@Injectable()
export class GetArtistByIdUseCase {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async execute(id: ArtistId): Promise<User> {
    const artist = await this.artistRepository.findArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist not found with ID: ${id}`);
    }
    return artist;
  }
}
