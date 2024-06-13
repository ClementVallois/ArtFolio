import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
@Injectable()
export class GetAllPersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
  ) {}

  async execute(): Promise<PersonalDataRequest[]> {
    const dataRequest =
      await this.personalDataRequestRepository.findAllPersonalDataRequestWithUser();
    if (dataRequest.length === 0) {
      throw new NotFoundException(`No data requests found`);
    }
    return dataRequest;
  }
}
