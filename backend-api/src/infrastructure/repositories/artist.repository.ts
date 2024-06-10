import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistRepository implements IArtistRepository {
  constructor(
    @InjectRepository(User)
    private readonly artistRepository: Repository<User>,
  ) {}

  async create(artistData: CreateArtistDto): Promise<User> {
    const artist = this.artistRepository.create(artistData);
    return this.artistRepository.save(artist);
  }

  async findArtistById(id: string): Promise<User | undefined> {
    return this.artistRepository.findOne({
      where: { id, role: 'artist' },
    });
  }

  async find(options?: any): Promise<User[] | undefined> {
    return this.artistRepository.find({
      where: { role: 'artist' },
    });
  }

  async findAllByDescCreateDate(options?: any): Promise<User[] | undefined> {
    return this.artistRepository.find({
      where: { role: 'artist' },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(artist: User): Promise<User> {
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
