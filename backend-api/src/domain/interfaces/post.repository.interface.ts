import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { User } from '../entities/user.entity';

export interface IArtistRepository {
  create(artist: any): Promise<User>;
  findArtistById(id: string): Promise<User>;
  find(options?: any): Promise<User[]>;
  findAllByDescCreateDate(): Promise<User[]>;
  remove(artist: any): Promise<User>;
  updateArtist(artist: User, artistData: UpdateArtistDto): Promise<User>;
  findLastRegisteredArtists(numberToRetrieve: number): Promise<User[]>;
}
