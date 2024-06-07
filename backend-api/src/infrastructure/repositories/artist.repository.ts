import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { ArtistRepository } from 'src/domain/interfaces/artistRepository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmArtistRepository implements ArtistRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findArtistById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id, role: 'artist' },
    });
  }

  async find(options?: any): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async findOne(options?: any): Promise<User | undefined> {
    return this.userRepository.findOne(options);
  }
}
