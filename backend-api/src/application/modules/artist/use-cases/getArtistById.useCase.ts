import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { ArtistId } from 'src/domain/value objects/artistId';
import { Repository } from 'typeorm';

@Injectable()
export class GetArtistByIdUseCase {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: ArtistId): Promise<User> {
    const artistId = id.toString();
    const artist = await this.userRepository.findOne({
      where: { id: artistId, role: 'artist' },
    });
    if (!artist) {
      throw new NotFoundException(`Artist not found with ID: ${artistId}`);
    }
    return artist;
  }
}
