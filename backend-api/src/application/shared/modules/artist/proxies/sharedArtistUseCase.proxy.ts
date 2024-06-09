import { Injectable } from '@nestjs/common';
import { CreateArtistUseCase } from 'src/application/modules/artist/use-cases/createArtist.useCase';
import { GetLastRegisteredArtistsPostsUseCase } from 'src/application/modules/artist/use-cases/getLastRegisteredArtistsPosts.useCase';
import { GetRandomArtistsPostUseCase } from 'src/application/modules/artist/use-cases/getRandomArtistsPost.useCase';
import { RemoveArtistUseCase } from 'src/application/modules/artist/use-cases/removeArtist.useCase';
import { UpdateArtistUseCase } from 'src/application/modules/artist/use-cases/updateArtist.useCase';

@Injectable()
export class SharedArtistUseCaseProxy {
  constructor(
    private readonly getLastRegisteredArtistsPostsUseCase: GetLastRegisteredArtistsPostsUseCase,
    private readonly getRandomArtistsPostUseCase: GetRandomArtistsPostUseCase,
    private readonly createArtistUseCase: CreateArtistUseCase,
    private readonly updateArtistUseCase: UpdateArtistUseCase,
    private readonly removeArtistUseCase: RemoveArtistUseCase,
  ) {}

  getLastRegisteredArtistsPosts =
    this.getLastRegisteredArtistsPostsUseCase.execute.bind(
      this.getLastRegisteredArtistsPostsUseCase,
    );
  getRandomArtistsPost = this.getRandomArtistsPostUseCase.execute.bind(
    this.getRandomArtistsPostUseCase,
  );
  handleCreateArtist = this.createArtistUseCase.execute.bind(
    this.createArtistUseCase,
  );
  handleUpdateArtist = this.updateArtistUseCase.execute.bind(
    this.updateArtistUseCase,
  );
  removeArtist = this.removeArtistUseCase.execute.bind(
    this.removeArtistUseCase,
  );
}
