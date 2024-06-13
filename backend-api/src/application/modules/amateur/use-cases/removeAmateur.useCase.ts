import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { GetAmateurByIdUseCase } from './getAmateurById.useCase';
import { UserId } from 'src/domain/value-objects/userId';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';

@Injectable()
export class RemoveAmateurUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
    private readonly getAmateurByIdUseCase: GetAmateurByIdUseCase,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  async execute(amateurId: AmateurId): Promise<User> {
    const user = await this.getAmateurByIdUseCase.execute(amateurId);

    await this.profilePictureHandler.deleteProfilePicture(
      new UserId(amateurId.toString()),
    );

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
