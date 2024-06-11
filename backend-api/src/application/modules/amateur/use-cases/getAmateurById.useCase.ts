import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';

@Injectable()
export class GetAmateurByIdUseCase {
  constructor(private readonly amateurRepository: AmateurRepository) {}

  async execute(amateurId: AmateurId): Promise<User> {
    const amateur = await this.amateurRepository.findAmateurById(amateurId);
    if (!amateur) {
      throw new NotFoundException(`Amateur not found with ID: ${amateurId}`);
    }
    return amateur;
  }
}
