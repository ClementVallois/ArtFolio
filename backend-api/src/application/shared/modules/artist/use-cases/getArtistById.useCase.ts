import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User as Artist } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';

@Injectable()
export class GetArtistByIdUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
  ) {}

  async execute(id: ArtistId): Promise<Artist> {
    const artist = await this.artistRepository.findArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist not found with ID: ${id}`);
    }
    return artist;
  }
}
