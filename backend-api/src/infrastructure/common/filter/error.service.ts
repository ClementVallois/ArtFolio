import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/presentation/artist/dto/create-artist.dto';
import { CreateUserDto } from 'src/presentation/user/dto/create-user.dto';

@Injectable()
export class ErrorService {
  parseDatabaseError(
    error: any,
    data: CreateArtistDto | CreateUserDto,
  ): string {
    if (error.code === '23505') {
      if (error.detail.includes('username')) {
        return `Artist with username ${data.username} already exists`;
      } else if (error.detail.includes('auth0_id')) {
        return `Artist with Auth0 ID ${data.auth0Id} already exists`;
      }
    }
    return 'Error creating artist';
  }
}
