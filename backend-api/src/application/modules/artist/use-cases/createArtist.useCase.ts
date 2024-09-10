import { Inject, Injectable } from '@nestjs/common';
import { User as Artist } from 'src/domain/entities/user.entity';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ValidationService } from 'src/application/validators/validation.service';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { AssignCategoriesToArtistUseCase } from '../../../shared/modules/category/use-cases/assignCategoriesToArtist.useCase';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { FileUploadDto } from 'src/presentation/dto/artist/fileUpload.dto';
import { CreatePostUseCase } from 'src/application/shared/modules/post/use-cases/createPost.useCase';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class CreateArtistUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly assignCategoriesToArtistUseCase: AssignCategoriesToArtistUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly validationService: ValidationService,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    artistData: CreateArtistDto,
    files: FileUploadDto,
  ): Promise<Artist> {
    await this.validationService.validateArtistCategories(artistData);
    await this.validationService.validateProfilePicture(files);
    await this.validationService.validatePostPicture(files);

    const profilePicture = files.profilePicture[0];
    const postPicture = files.postPicture[0];
    let artist: Artist;
    try {
      artist = await this.artistRepository.createArtist(artistData);
    } catch (error) {
      this.databaseErrorHandler.handleDatabaseError(error, artistData);
    }

    await this.profilePictureHandler.createOrUpdateProfilePicture(
      artist,
      profilePicture,
    );

    await this.createPostUseCase.execute(
      {
        isPinned: artistData.post.isPinned,
        description: artistData.post.description,
        artistId: artist.id,
      },
      postPicture,
    );

    await this.assignCategoriesToArtistUseCase.execute(
      new ArtistId(artist.id),
      artistData.category.categories,
    );

    return artist;
  }
}
