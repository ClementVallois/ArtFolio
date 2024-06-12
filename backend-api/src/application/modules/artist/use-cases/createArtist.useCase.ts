import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { SharedPostUseCaseProxy } from 'src/application/shared/modules/post/proxies/sharedPostUseCase.proxy';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ValidationService } from 'src/application/validators/validation.service';
import { File } from '@nest-lab/fastify-multer';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { AssignCategoriesToArtistUseCase } from '../../category/use-cases/assignCategoriesToArtist.useCase';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';

@Injectable()
export class CreateArtistUseCase {
  constructor(
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository,
    private readonly sharedPostUseCaseProxy: SharedPostUseCaseProxy,
    private readonly assignCategoriesToArtistUseCase: AssignCategoriesToArtistUseCase,
    private readonly validationService: ValidationService,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  async execute(
    artistData: CreateArtistDto,
    files: { profilePicture?: File; postPicture?: File[] },
  ): Promise<User> {
    // TODO : Try to use validateFilesAndData method instead of individual methods
    await this.validationService.validateArtistCategories(artistData);
    await this.validationService.validateProfilePicture(files);
    await this.validationService.validatePostPicture(files);
    const profilePicture = files.profilePicture[0];
    const postPicture = files.postPicture[0];

    let artist: User;
    try {
      artist = await this.artistRepository.createArtist(artistData);
    } catch (error) {
      this.databaseErrorHandler.handleDatabaseError(error, artistData);
    }

    await this.profilePictureHandler.handle(artist, profilePicture);

    await this.sharedPostUseCaseProxy.createPost(
      {
        isPinned: artistData.post.isPinned,
        description: artistData.post.description,
        userId: artist.id,
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
