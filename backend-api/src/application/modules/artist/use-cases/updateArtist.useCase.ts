import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { Repository } from 'typeorm';
import { ProfilePictureHandler } from 'src/application/handlers/profilePictureHandler';
import { File } from '@nest-lab/fastify-multer';
import { GetArtistByIdUseCase } from './getArtistById.useCase';
import { ArtistId } from 'src/domain/value objects/artistId';

@Injectable()
export class UpdateArtistUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  async execute(
    id: ArtistId,
    artistData: UpdateArtistDto,
    profilePicture: File,
  ): Promise<User> {
    const artist = await this.getArtistByIdUseCase.execute(id);

    this.userRepository.merge(artist, artistData);
    const updatedArtist = await this.userRepository.save(artist);

    await this.profilePictureHandler.handle(updatedArtist, profilePicture);
    return artist;
  }
}
