import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value objects/artistId';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';

@Injectable()
export class GetArtistByIdUseCase {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async execute(id: ArtistId): Promise<User> {
    const artistId = id.toString();
    const artist = await this.artistRepository.findArtistById(artistId);
    if (!artist) {
      throw new NotFoundException(`Artist not found with ID: ${artistId}`);
    }
    return artist;
  }
}
