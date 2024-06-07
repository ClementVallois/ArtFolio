import { User } from '../entities/user.entity';
import { ReadOnlyRepository } from './repository.interface';

export interface ArtistRepository extends ReadOnlyRepository<User> {
  findArtistById(id: string): Promise<User | undefined>;
}
