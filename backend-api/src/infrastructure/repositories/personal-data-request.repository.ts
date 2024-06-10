import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { User } from 'src/domain/entities/user.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { CreateDataRequestDto } from 'src/presentation/dto/personal-data-request/create-data-request.dto';
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
    dataRequestData: CreateDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const dataRequest =
      this.personalDataRequestRepository.create(dataRequestData);
    return this.personalDataRequestRepository.save(dataRequest);
  }

  async find(options?: any): Promise<User[] | undefined> {
    return this.personalDataRequestRepository.find({
      where: { role: 'artist' },
    });
  }

  async remove(artist: User): Promise<User> {
    return this.personalDataRequestRepository.remove(artist);
  }
}
