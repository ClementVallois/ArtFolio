import { File } from '@nest-lab/fastify-multer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';

@Injectable()
export class ValidationService {
  public validateFilesAndData(
    files: { profilePicture?: File; postPicture?: File[] },
    artistData?: CreateArtistDto,
  ): void {
    this.validateProfilePicture(files);
    this.validatePostPicture(files);
    this.validateArtistData(artistData);
  }

  public validateProfilePicture(files: { profilePicture?: File }): void {
    if (!files.profilePicture) {
      throw new BadRequestException('Profile picture file is required.');
    }
  }

  private validatePostPicture(files: { postPicture?: File[] }): void {
    if (!files.postPicture || files.postPicture.length === 0) {
      throw new BadRequestException('Post picture file is required.');
    }
  }

  private validateArtistData(artistData: CreateArtistDto): void {
    if (!artistData.category || artistData.category.categories.length === 0) {
      throw new BadRequestException('Category is required.');
    }
  }
}
