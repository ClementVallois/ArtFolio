import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetAmateurByIdUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(amateurId: AmateurId): Promise<Amateur> {
    const amateur = await this.amateurRepository.findAmateurById(amateurId);
    if (!amateur) {
      throw new NotFoundException(`Amateur not found with ID: ${amateurId}`);
    }
    return amateur;
  }
}
