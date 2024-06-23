import { Module } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetArtistByIdUseCase } from 'src/application/modules/artist/use-cases/getArtistById.useCase';
import { ArtistRepository } from 'src/infrastructure/repositories/artist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    { provide: 'IArtistRepository', useClass: ArtistRepository },
    GetArtistByIdUseCase,
  ],
  exports: [GetArtistByIdUseCase],
})
export class SharedArtistModule {}
