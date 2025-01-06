import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { PersonalDataRequestId } from 'src/domain/value-objects/personalDataRequestId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetOnePersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(id: PersonalDataRequestId): Promise<PersonalDataRequest> {
    const personalDataRequest =
      await this.personalDataRequestRepository.getPersonalDataRequestById(id);
    if (!personalDataRequest) {
      throw new NotFoundException(
        `Personal Data Request does not exists with ID: ${id}`,
      );
    }
    return personalDataRequest;
  }
}
