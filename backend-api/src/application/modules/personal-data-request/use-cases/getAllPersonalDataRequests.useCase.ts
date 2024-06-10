import { Injectable } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
@Injectable()
export class GetAllPersonalDataRequestUseCase {
  constructor(
    private readonly personalDataRequestRepository: PersonalDataRequestRepository,
  ) {}

  async execute(): Promise<PersonalDataRequest[]> {
    const dataRequests = await this.personalDataRequestRepository.find({
      relations: ['user'],
    });
    return dataRequests;
  }
}
