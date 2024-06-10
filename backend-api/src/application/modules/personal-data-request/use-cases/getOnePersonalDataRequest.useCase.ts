import { Injectable } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { PersonalDataRequestId } from 'src/domain/value objects/personalDataRequestId';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
@Injectable()
export class GetOnePersonalDataRequestUseCase {
  constructor(
    private readonly personalDataRequestRepository: PersonalDataRequestRepository,
  ) {}
  async execute(id: PersonalDataRequestId): Promise<PersonalDataRequest> {
    const personalDataRequestId = id.toString();
    return this.personalDataRequestRepository.findOne({
      where: { id: personalDataRequestId },
    });
  }
}
