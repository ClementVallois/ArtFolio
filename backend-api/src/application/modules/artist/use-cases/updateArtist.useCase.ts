import { Inject, Injectable } from '@nestjs/common';
import { User as Artist } from 'src/domain/entities/user.entity';
import { UpdateArtistDto } from 'src/presentation/dto/artist/update-artist.dto';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { File } from '@nest-lab/fastify-multer';
import { GetArtistByIdUseCase } from '../../../shared/modules/artist/use-cases/getArtistById.useCase';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { FileUploadDto } from 'src/presentation/dto/artist/fileUpload.dto';

@Injectable()
export class UpdateArtistUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    id: ArtistId,
    artistData: UpdateArtistDto,
    file?: FileUploadDto,
  ): Promise<Artist> {
    const profilePicture = file?.profilePicture?.[0];

    console.log('Body:', artistData);
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
