import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { UserId } from 'src/domain/value objects/userId';
import { Repository } from 'typeorm';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserById(userId: UserId): Promise<User> {
    return this.userRepository.findOneBy({ id: userId.toString() });
  }
}
