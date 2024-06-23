import { File } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryId } from 'src/domain/value-objects/categoryId';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { GetCategoryByIdUseCase } from '../shared/modules/category/use-cases/getCategoryById.useCase';

@Injectable()
export class ValidationService {
  constructor(
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
  ) {}
  public validateFilesAndData(
    files: { profilePicture?: File; postPicture?: File[] },
    artistData?: CreateArtistDto,
  ): Promise<void> {
    this.validateProfilePicture(files);
    this.validatePostPicture(files);
    this.validateArtistCategories(artistData);
    return Promise.resolve();
  }

  async validateProfilePicture(files: {
    profilePicture?: File;
  }): Promise<void> {
    if (!files.profilePicture) {
      throw new BadRequestException('Profile picture file is required.');
    }
  }

  async validatePostPicture(files: { postPicture?: File[] }): Promise<void> {
    if (!files.postPicture || files.postPicture.length === 0) {
      throw new BadRequestException('Post picture file is required.');
    }
  }

  async validateArtistCategories(artistData: CreateArtistDto): Promise<void> {
    for (const category of artistData.category.categories) {
      const categoriesId = new CategoryId(category.toString());
      const categoriesExist =
        await this.getCategoryByIdUseCase.execute(categoriesId);
      if (!categoriesExist) {
        throw new NotFoundException('One or more categories do not exist.');
      }
    }
  }
}
