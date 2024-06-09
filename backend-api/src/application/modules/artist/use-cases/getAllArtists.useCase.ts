import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllArtistsUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { role: 'artist' },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new HttpException(
        'Error getting artists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
