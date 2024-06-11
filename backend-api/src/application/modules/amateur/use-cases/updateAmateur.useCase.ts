import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { UpdateUserDto } from 'src/presentation/dto/amateur/update-user.dto';

@Injectable()
export class UpdateAmateurUseCase {
  constructor(
    private readonly amateurRepository: AmateurRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  async execute(
    amateurId: AmateurId,
    amateurData: UpdateUserDto,
  ): Promise<User> {
    const amateur = await this.amateurRepository.findAmateurById(amateurId);
    if (!amateur) {
      throw new NotFoundException(`Amateur not found with ID: ${amateurId}`);
    }

    let updatedAmateur: User;
    try {
      updatedAmateur = await this.amateurRepository.updateAmateur(
        amateur,
        amateurData,
      );
    } catch (error) {
      this.databaseErrorHandler.handleDatabaseError(error, amateurData);
    }

    return updatedAmateur;
  }
}
