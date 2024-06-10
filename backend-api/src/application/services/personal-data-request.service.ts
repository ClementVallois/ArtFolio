import { Injectable } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { CreateDataRequestDto } from 'src/presentation/dto/personal-data-request/create-data-request.dto';
import { PersonalDataRequestId } from 'src/domain/value objects/personalDataRequestId';

@Injectable()
export class PersonalDataRequestService {
  constructor(
    @InjectRepository(PersonalDataRequest)
    private readonly dataRequestRepository: Repository<PersonalDataRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllDataRequests(): Promise<PersonalDataRequest[]> {
    const dataRequests = await this.dataRequestRepository.find({
      relations: ['user'],
    });
    return dataRequests;
  }

  getOneDataRequest(id: PersonalDataRequestId): Promise<PersonalDataRequest> {
    const personalDataRequestId = id.toString();
    return this.dataRequestRepository.findOne({
      where: { id: personalDataRequestId },
    });
  }

  async createDataRequest(
    dataRequestData: CreateDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const user = await this.userRepository.findOne({
      where: { id: dataRequestData.user },
    });
    const dataRequest = new PersonalDataRequest();
    dataRequest.user = user;
    return this.dataRequestRepository.save(dataRequest);
  }
}
