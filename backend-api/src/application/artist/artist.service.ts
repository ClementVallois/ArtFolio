import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { CreateArtistDto } from 'src/presentation/artist/dto/create-artist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllArtists(): Promise<User[]> {
    try {
      return await this.userRepository.find({ where: { role: 'artist' } });
    } catch (error) {
      throw new HttpException(
        'Error getting artists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getArtistById(id: string): Promise<User> {
    if (!id) {
      throw new HttpException('Artist ID is required', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.findOneBy({ id: id });
  }

  async createArtist(artistData: CreateArtistDto): Promise<User> {
    try {
      const createArtist = this.userRepository.create(artistData);
      await this.userRepository.save(createArtist);
      return createArtist;
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          'Artist with this ID already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    throw new HttpException(
      'Error creating artist',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async updateArtist(id: string) {}

  async removeArtist(id: string) {}
}
