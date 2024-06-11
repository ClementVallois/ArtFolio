import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { User } from '../entities/user.entity';
import { ArtistId } from '../value objects/artistId';

export interface IArtistRepository {
  createArtist(artist: any): Promise<User>;
  findArtistById(id: ArtistId): Promise<User>;
  findAllArtists(): Promise<User[]>;
  findAllByDescCreateDate(): Promise<User[]>;
  removeArtist(artist: User): Promise<User>;
  updateArtist(artist: User, artistData: UpdateArtistDto): Promise<User>;
  findLastRegisteredArtists(numberToRetrieve: number): Promise<User[]>;
}
