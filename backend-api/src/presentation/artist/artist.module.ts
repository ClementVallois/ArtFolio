import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from 'src/application/artist/artist.service';
import { User } from 'src/infrastructure/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/infrastructure/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Post])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
