import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetUserDataRequestsUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(userId: UserId): Promise<PersonalDataRequest[]> {
    const dataRequests =
      await this.personalDataRequestRepository.findPersonalDataRequestsByUserId(
        userId,
      );
    if (!dataRequests || dataRequests.length === 0) {
      throw new NotFoundException(
        `Data Requests not found for User with ID: ${userId}`,
      );
    }
    return dataRequests;
  }
}
