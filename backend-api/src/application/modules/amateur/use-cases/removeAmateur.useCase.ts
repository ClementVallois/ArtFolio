import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { GetAmateurByIdUseCase } from '../../../shared/modules/amateur/use-cases/getAmateurById.useCase';
import { UserId } from 'src/domain/value-objects/userId';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class RemoveAmateurUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
    private readonly getAmateurByIdUseCase: GetAmateurByIdUseCase,
    private readonly profilePictureHandler: ProfilePictureHandler,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(amateurId: AmateurId): Promise<Amateur> {
    const user = await this.getAmateurByIdUseCase.execute(amateurId);

    await this.profilePictureHandler.deleteProfilePicture(
      new UserId(amateurId.toString()),
    );

    try {
      return await this.amateurRepository.removeAmateur(user);
    } catch (error) {
      this.logger.error(
        `Failed to remove amateur from database: ${error}`,
        error,
      );
      throw new HttpException(
        'Failed to remove user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
