import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ArtistId } from 'src/domain/value objects/artistId';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistRepository implements IArtistRepository {
  constructor(
    @InjectRepository(User)
    private readonly artistRepository: Repository<User>,
  ) {}

  async createArtist(artistData: CreateArtistDto): Promise<User> {
    const artist = this.artistRepository.create(artistData);
    return this.artistRepository.save(artist);
  }

  async findArtistById(id: ArtistId): Promise<User> {
    const artistId = id.toString();
    return this.artistRepository.findOne({
      where: { id: artistId, role: 'artist' },
    });
  }

  async findAllArtists(): Promise<User[]> {
    return this.artistRepository.find({
      where: { role: 'artist' },
    });
  }

  async findAllByDescCreateDate(): Promise<User[]> {
    return this.artistRepository.find({
      where: { role: 'artist' },
      order: { createdAt: 'DESC' },
    });
  }

  async removeArtist(artist: User): Promise<User> {
    return this.artistRepository.remove(artist);
  }

  async updateArtist(artist: User, artistData: UpdateArtistDto): Promise<User> {
    this.artistRepository.merge(artist, artistData);
    return this.artistRepository.save(artist);
  }

  findLastRegisteredArtists(numberToRetrieve: number): Promise<User[]> {
    return this.artistRepository.find({
      where: { role: 'artist' },
      order: { createdAt: 'DESC' },
      take: numberToRetrieve,
    });
  }
}
