import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { User as Artist } from '../entities/user.entity';
import { ArtistId } from '../value-objects/artistId';

export interface IArtistRepository {
  createArtist(artist: any): Promise<Artist>;
  findArtistById(id: ArtistId): Promise<Artist>;
  findAllArtists(): Promise<Artist[]>;
  findAllByDescCreateDate(): Promise<Artist[]>;
  removeArtist(artist: Artist): Promise<Artist>;
  updateArtist(artist: Artist, artistData: UpdateArtistDto): Promise<Artist>;
  findLastRegisteredArtists(numberToRetrieve: number): Promise<Artist[]>;
}
