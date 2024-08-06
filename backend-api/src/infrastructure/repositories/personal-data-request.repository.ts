import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { PersonalDataRequestId } from 'src/domain/value-objects/personalDataRequestId';
import { UserId } from 'src/domain/value-objects/userId';
import { UpdatePersonalDataRequestDto } from 'src/presentation/dto/personal-data-request/update-personal-data-request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalDataRequestRepository
  implements IPersonalDataRequestRepository
{
  constructor(
    @InjectRepository(PersonalDataRequest)
    private readonly personalDataRequestRepository: Repository<PersonalDataRequest>,
  ) {}

  async createPersonalDataRequest(
    personalDataRequestData: PersonalDataRequest,
  ): Promise<PersonalDataRequest> {
    const personalDataRequest = this.personalDataRequestRepository.create(
      personalDataRequestData,
    );
    return this.personalDataRequestRepository.save(personalDataRequest);
  }

  async getAllPersonalDataByUserId(userId: UserId): Promise<any> {
    const result = await this.personalDataRequestRepository.query(
      `SELECT fetch_user_data($1)`,
      [userId.toString()],
    );
    return result[0];
  }

  getPersonalDataRequestByUserId(userId: UserId): Promise<PersonalDataRequest> {
    return this.personalDataRequestRepository.findOne({
      where: { user: { id: userId.toString() }, status: 'requested' },
    });
  }

  async findAllPersonalDataRequestWithUser(): Promise<PersonalDataRequest[]> {
    return this.personalDataRequestRepository.find({ relations: ['user'] });
  }

  findAllRequestedPersonalDataRequestWithUser(): Promise<
    PersonalDataRequest[]
  > {
    return this.personalDataRequestRepository.find({
      where: { status: 'requested' },
      relations: ['user'],
    });
  }

  async findOnePersonalDataRequest(
    personalDataRequestId: PersonalDataRequestId,
  ): Promise<PersonalDataRequest> {
    const id = personalDataRequestId.toString();
    return this.personalDataRequestRepository.findOne({
      where: { id: id },
    });
  }

  async updatePersonalDataRequest(
    personalDataRequestId: PersonalDataRequestId,
    personalDataRequestData: UpdatePersonalDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const personalDataRequest = await this.findOnePersonalDataRequest(
      personalDataRequestId,
    );
    personalDataRequest.status = personalDataRequestData.status;
    return this.personalDataRequestRepository.save(personalDataRequest);
  }

  async deletePersonalDataRequest(
    personalDataRequestId: PersonalDataRequestId,
  ): Promise<PersonalDataRequest> {
    const personalDataRequest = await this.findOnePersonalDataRequest(
      personalDataRequestId,
    );
    return this.personalDataRequestRepository.remove(personalDataRequest);
  }
}
