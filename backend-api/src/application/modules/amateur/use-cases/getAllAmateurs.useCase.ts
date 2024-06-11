import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';

@Injectable()
export class GetAllAmateursUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
  ) {}

  async execute(): Promise<User[]> {
    const amateurs = await this.amateurRepository.findAllAmateurs();
    if (amateurs.length === 0) {
      throw new NotFoundException('No amateur found');
    }
    return amateurs;
  }
}
