import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { UserId } from 'src/domain/value objects/userId';
import { CreateDataRequestDto } from 'src/presentation/dto/personal-data-request/create-data-request.dto';
import { GetUserByIdUseCase } from '../../user/use-cases/getUserById.useCase';
@Injectable()
export class CreatePersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}
  async execute(
    personalDataRequestData: CreateDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const user = await this.getUserByIdUseCase.execute(
      new UserId(personalDataRequestData.userId),
    );
    if (!user) {
      throw new NotFoundException(
        `User not found with ID: ${personalDataRequestData.userId}`,
      );
    }
    const dataRequest = new PersonalDataRequest();
    dataRequest.user = user;
    return this.personalDataRequestRepository.createPersonalDataRequest(
      dataRequest,
    );
  }
}
