import { Injectable } from '@nestjs/common';
import { GetAllArtistsUseCase } from '../use-cases/getAllArtists.useCase';
import { GetArtistByIdUseCase } from '../use-cases/getArtistById.useCase';

@Injectable()
export class ArtistUseCaseProxy {
  constructor(
    private readonly getAllArtistsUseCase: GetAllArtistsUseCase,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
  ) {}

  getAllArtists = this.getAllArtistsUseCase.execute.bind(
    this.getAllArtistsUseCase,
  );

  getArtistById = this.getArtistByIdUseCase.execute.bind(
    this.getArtistByIdUseCase,
  );
}
