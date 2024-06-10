import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { User } from '../entities/user.entity';

export interface IArtistRepository {
  create(artist: any): Promise<User>;
  findArtistById(id: string): Promise<User | undefined>;
  find(options?: any): Promise<User[] | undefined>;
  findAllByDescCreateDate(): Promise<User[] | undefined>;
  remove(artist: any): Promise<User>;
  updateArtist(artist: User, artistData: UpdateArtistDto): Promise<User>;
  findLastRegisteredArtists(numberToRetrieve: number): Promise<User[]>;
}
