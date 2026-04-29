import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { User as Artist } from '../entities/user.entity';
import { ArtistId } from '../value-objects/artistId';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';

export interface IArtistRepository {
  createArtist(artist: CreateArtistDto): Promise<Artist>;
  findArtistById(id: ArtistId): Promise<Artist>;
  findAllArtists(): Promise<Artist[]>;
  findAllByDescCreateDate(): Promise<Artist[]>;
  removeArtist(artist: Artist): Promise<Artist>;
  updateArtist(artist: Artist, artistData: UpdateArtistDto): Promise<Artist>;
  findLastRegisteredArtists(numberToRetrieve: number): Promise<Artist[]>;
}
