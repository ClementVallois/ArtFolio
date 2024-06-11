import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { UserId } from 'src/domain/value objects/userId';
import { CreateDataRequestDto } from 'src/presentation/dto/personal-data-request/create-data-request.dto';
@Injectable()
export class CreatePersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(
    personalDataRequestData: CreateDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const user = await this.userRepository.findUserById(
      new UserId(personalDataRequestData.user),
    );
    if (!user) {
      throw new NotFoundException(
        `User not found with ID: ${personalDataRequestData.user}`,
      );
    }
    const dataRequest = new PersonalDataRequest();
    dataRequest.user = user;
    return this.personalDataRequestRepository.createPersonalDataRequest(
      dataRequest,
    );
  }
}
