import { Injectable } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
@Injectable()
export class GetAllPersonalDataRequestUseCase {
  constructor(
    private readonly personalDataRequestRepository: PersonalDataRequestRepository,
  ) {}

  async execute(): Promise<PersonalDataRequest[] | string> {
    const dataRequest =
      await this.personalDataRequestRepository.findAllPersonalDataRequestWithUser();
    if (dataRequest.length === 0) {
      return 'No data request found';
    }
    return dataRequest;
  }
}
