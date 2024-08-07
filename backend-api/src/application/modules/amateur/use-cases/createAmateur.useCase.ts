import { Inject, Injectable } from '@nestjs/common';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ValidationService } from 'src/application/validators/validation.service';
import { File } from '@nest-lab/fastify-multer';
import { CreateAmateurDto } from 'src/presentation/dto/amateur/create-amateur.dto';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';

@Injectable()
export class CreateAmateurUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
    private readonly validationService: ValidationService,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  async execute(
    amateurData: CreateAmateurDto,
    files: { profilePicture: File },
  ): Promise<Amateur> {
    await this.validationService.validateProfilePicture(files);

    const profilePicture = files.profilePicture[0];

    let amateur: Amateur;
    try {
      amateur = await this.amateurRepository.createAmateur(amateurData);
    } catch (error) {
      this.databaseErrorHandler.handleDatabaseError(error, amateurData);
    }

    await this.profilePictureHandler.createOrUpdateProfilePicture(
      amateur,
      profilePicture,
    );

    return amateur;
  }
}
