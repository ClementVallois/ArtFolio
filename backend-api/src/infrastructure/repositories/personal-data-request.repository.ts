import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { PersonalDataRequestId } from 'src/domain/value objects/personalDataRequestId';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalDataRequestRepository
  implements IPersonalDataRequestRepository
{
  constructor(
    @InjectRepository(PersonalDataRequest)
    private readonly personalDataRequestRepository: Repository<PersonalDataRequest>,
  ) {}

  async create(
    personalDataRequestData: PersonalDataRequest,
  ): Promise<PersonalDataRequest> {
    const personalDataRequest = this.personalDataRequestRepository.create(
      personalDataRequestData,
    );
    return this.personalDataRequestRepository.save(personalDataRequest);
  }

  async findAllPersonalDataRequestWithUser(): Promise<
    PersonalDataRequest[] | undefined
  > {
    return this.personalDataRequestRepository.find({ relations: ['user'] });
  }

  async findOne(
    personalDataRequestId: PersonalDataRequestId,
  ): Promise<PersonalDataRequest> {
    const id = personalDataRequestId.toString();
    return this.personalDataRequestRepository.findOne({
      where: { id: id },
    });
  }

  // async remove(
  //   dataRequestId: PersonalDataRequestId,
  // ): Promise<PersonalDataRequest> {
  //   return this.personalDataRequestRepository.remove(dataRequestId);
  // }
}
