import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';

@Injectable()
export class ArtistValidator {
  validateCreateArtistData(artistData: CreateArtistDto, files: any): void {
    if (!files.profilePicture || files.profilePicture.length === 0) {
      throw new BadRequestException('Profile picture is required');
    }
    if (!files.postPicture || files.postPicture.length === 0) {
      throw new BadRequestException('Post picture is required');
    }
  }
}
