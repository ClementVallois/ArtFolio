import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

@Injectable()
export class GetAllPersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<PersonalDataRequest[]> {
    try {
      this.logger.debug('Fetching all personal data requests with users');

      const dataRequests =
        await this.personalDataRequestRepository.findAllPersonalDataRequestWithUser();

      this.logger.debug(`Found ${dataRequests.length} personal data requests`);

      if (dataRequests.length === 0) {
        const errorMessage = 'No data requests found';
        this.logger.warn(errorMessage);
        throw new NotFoundException(errorMessage);
      }

      this.logger.debug('Successfully retrieved all personal data requests');
      return dataRequests;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        'Failed to execute GetAllPersonalDataRequestUseCase',
        error,
      );
      throw error;
    }
  }
}
