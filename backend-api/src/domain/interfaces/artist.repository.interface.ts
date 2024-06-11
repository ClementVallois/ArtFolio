import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { User } from '../entities/user.entity';
import { ArtistId } from '../value objects/artistId';

export interface IArtistRepository {
  create(artist: any): Promise<User>;
  findArtistById(id: ArtistId): Promise<User | undefined>;
  findAll(): Promise<User[] | undefined>;
  findAllByDescCreateDate(): Promise<User[] | undefined>;
  remove(artist: any): Promise<User>;
  updateArtist(artist: User, artistData: UpdateArtistDto): Promise<User>;
  findLastRegisteredArtists(numberToRetrieve: number): Promise<User[]>;
}
