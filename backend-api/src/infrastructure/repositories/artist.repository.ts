import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as Artist } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistRepository implements IArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async createArtist(artistData: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(artistData);
    return this.artistRepository.save(artist);
  }

  async findArtistById(id: ArtistId): Promise<Artist> {
    const artistId = id.toString();
    return this.artistRepository.findOne({
      where: { id: artistId, role: 'artist' },
    });
  }

  async findAllArtists(): Promise<Artist[]> {
    return this.artistRepository.find({
      where: { role: 'artist' },
    });
  }

  async findAllByDescCreateDate(): Promise<Artist[]> {
    return this.artistRepository.find({
      where: { role: 'artist' },
      order: { createdAt: 'DESC' },
    });
  }

  async removeArtist(artist: Artist): Promise<Artist> {
    return this.artistRepository.remove(artist);
  }

  async updateArtist(
    artist: Artist,
    artistData: UpdateArtistDto,
  ): Promise<Artist> {
    this.artistRepository.merge(artist, artistData);
    return this.artistRepository.save(artist);
  }

  async findLastRegisteredArtists(numberToRetrieve: number): Promise<Artist[]> {
    return this.artistRepository.find({
      where: { role: 'artist' },
      order: { createdAt: 'DESC' },
      take: numberToRetrieve,
    });
  }
}
