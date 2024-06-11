import { Inject, Injectable } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { PersonalDataRequestId } from 'src/domain/value objects/personalDataRequestId';
@Injectable()
export class GetOnePersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
  ) {}
  async execute(id: PersonalDataRequestId): Promise<PersonalDataRequest> {
    return this.personalDataRequestRepository.findOnePersonalDataRequest(id);
  }
}
