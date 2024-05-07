import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/presentation/artist/dto/create-artist.dto';

@Injectable()
export class ErrorService {
  parseDatabaseError(error: any, artistData: CreateArtistDto): string {
    if (error.code === '23505') {
      if (error.detail.includes('username')) {
        return `Artist with username ${artistData.username} already exists`;
      } else if (error.detail.includes('auth0_id')) {
        return `Artist with Auth0 ID ${artistData.auth0Id} already exists`;
      }
    }
    return 'Error creating artist';
  }
}
