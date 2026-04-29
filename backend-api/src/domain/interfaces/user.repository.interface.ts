import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/userId';

export interface IUserRepository {
  findUserById(userId: UserId): Promise<User>;
  findUserByAuth0Id(auth0Id: string): Promise<User>;
}
