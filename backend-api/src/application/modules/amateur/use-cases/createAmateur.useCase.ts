import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { ProfilePictureHandler } from 'src/application/handlers/profilePictureHandler';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ValidationService } from 'src/application/validators/validation.service';
import { File } from '@nest-lab/fastify-multer';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { CreateUserDto } from 'src/presentation/dto/amateur/create-user.dto';

@Injectable()
export class CreateAmateurUseCase {
  constructor(
    private readonly amateurRepository: AmateurRepository,
    private readonly validationService: ValidationService,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  async execute(
    amateurData: CreateUserDto,
    files: { profilePicture: File },
  ): Promise<User> {
    this.validationService.validateProfilePicture(files);
    const profilePicture = files.profilePicture[0];

    let amateur: User;
    try {
      amateur = await this.amateurRepository.createAmateur(amateurData);
    } catch (error) {
      this.databaseErrorHandler.handleDatabaseError(error, amateurData);
    }

    await this.profilePictureHandler.handle(amateur, profilePicture);

    return amateur;
  }
}
