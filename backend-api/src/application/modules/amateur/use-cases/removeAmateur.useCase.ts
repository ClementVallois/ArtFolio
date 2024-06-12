import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { FileService } from 'src/infrastructure/services/file/file.service';

@Injectable()
export class RemoveAmateurUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
    private readonly fileService: FileService,
  ) {}

  async execute(amateurId: AmateurId): Promise<User> {
    const user = await this.amateurRepository.findAmateurById(amateurId);
    if (!user) {
      throw new NotFoundException(`Amateur not found with ID: ${amateurId}`);
    }

    try {
      await this.fileService.deleteProfilePicture(user.id);
      await this.fileService.deleteUserPostsPictures(user.id);
    } catch (error) {
      throw new HttpException(
        "Failed to remove the amateur's profile picture",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      return await this.amateurRepository.removeAmateur(user);
    } catch (error) {
      console.error(`Failed to remove amateur from database: ${error}`);
      throw new HttpException(
        'Failed to remove user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
