import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { User } from 'src/domain/entities/user.entity';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
import { CreateDataRequestDto } from 'src/presentation/dto/personal-data-request/create-data-request.dto';
import { Repository } from 'typeorm';
@Injectable()
export class CreatePersonalDataRequestUseCase {
  constructor(
    private readonly personalDataRequestRepository: PersonalDataRequestRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(
    personalDataRequestData: CreateDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const user = await this.userRepository.findOneBy({
      id: personalDataRequestData.user,
    });
    const dataRequest = new PersonalDataRequest();
    dataRequest.user = user;
    return this.personalDataRequestRepository.createPersonalDataRequest(
      dataRequest,
    );
  }
}
