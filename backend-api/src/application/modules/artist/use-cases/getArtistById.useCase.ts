import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetArtistByIdUseCase {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: string): Promise<User> {
    const artist = await this.userRepository.findOne({
      where: { id: id, role: 'artist' },
    });
    if (!artist) {
      throw new NotFoundException(`Artist not found with ID: ${id}`);
    }
    return artist;
  }
}
