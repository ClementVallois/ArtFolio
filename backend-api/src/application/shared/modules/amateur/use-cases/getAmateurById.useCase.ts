import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';

@Injectable()
export class GetAmateurByIdUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
  ) {}

  async execute(amateurId: AmateurId): Promise<Amateur> {
    const amateur = await this.amateurRepository.findAmateurById(amateurId);
    if (!amateur) {
      throw new NotFoundException(`Amateur not found with ID: ${amateurId}`);
    }
    return amateur;
  }
}
