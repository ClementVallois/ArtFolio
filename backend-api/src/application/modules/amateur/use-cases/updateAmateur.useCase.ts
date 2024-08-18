import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { UpdateAmateurDto } from 'src/presentation/dto/amateur/update-amateur.dto';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class UpdateAmateurUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
    private readonly databaseErrorHandler: DatabaseErrorHandler,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    amateurId: AmateurId,
    amateurData: UpdateAmateurDto,
  ): Promise<Amateur> {
    const amateur = await this.amateurRepository.findAmateurById(amateurId);
    if (!amateur) {
      throw new NotFoundException(`Amateur not found with ID: ${amateurId}`);
    }

    let updatedAmateur: Amateur;
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
