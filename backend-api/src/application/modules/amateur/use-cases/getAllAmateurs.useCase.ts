import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetAllAmateursUseCase {
  constructor(
    @Inject('IAmateurRepository')
    private readonly amateurRepository: IAmateurRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<Amateur[]> {
    const amateurs = await this.amateurRepository.findAllAmateurs();
    if (amateurs.length === 0) {
      throw new NotFoundException('No amateur found');
    }
    return amateurs;
  }
}
