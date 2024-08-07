import { Inject, Injectable } from '@nestjs/common';
import { User as Artist } from 'src/domain/entities/user.entity';
import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { File } from '@nest-lab/fastify-multer';
import { GetArtistByIdUseCase } from '../../../shared/modules/artist/use-cases/getArtistById.useCase';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';

@Injectable()
export class UpdateArtistUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  async execute(
    id: ArtistId,
    artistData: UpdateArtistDto,
    profilePicture: File,
  ): Promise<Artist> {
    const artist = await this.getArtistByIdUseCase.execute(id);

    const updatedArtist = await this.artistRepository.updateArtist(
      artist,
      artistData,
    );

    await this.profilePictureHandler.createOrUpdateProfilePicture(
      updatedArtist,
      profilePicture,
    );
    return artist;
  }
}
