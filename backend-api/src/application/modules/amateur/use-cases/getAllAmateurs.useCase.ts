import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';

@Injectable()
export class GetAllAmateursUseCase {
  constructor(private readonly amateurRepository: AmateurRepository) {}

  async execute(): Promise<User[]> {
    const amateurs = await this.amateurRepository.findAllAmateurs();
    if (amateurs.length === 0) {
      throw new NotFoundException('No amateur found');
    }
    return amateurs;
  }
}
