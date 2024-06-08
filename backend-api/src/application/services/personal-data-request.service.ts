import { Injectable } from '@nestjs/common';
import { DataRequest } from 'src/domain/entities/data-request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { CreateDataRequestDto } from 'src/presentation/dto/personal-data-request/create-data-request.dto';

@Injectable()
export class PersonalDataRequestService {
  constructor(
    @InjectRepository(DataRequest)
    private readonly dataRequestRepository: Repository<DataRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllDataRequests(): Promise<DataRequest[]> {
    const dataRequests = await this.dataRequestRepository.find({
      relations: ['user'],
    });
    return dataRequests;
  }

  getOneDataRequest(id: string): Promise<DataRequest> {
    return this.dataRequestRepository.findOneBy({ id });
  }

  async createDataRequest(
    dataRequestData: CreateDataRequestDto,
  ): Promise<DataRequest> {
    const user = await this.userRepository.findOneBy({
      id: dataRequestData.user,
    });
    const dataRequest = new DataRequest();
    dataRequest.user = user;
    return this.dataRequestRepository.save(dataRequest);
  }
}
