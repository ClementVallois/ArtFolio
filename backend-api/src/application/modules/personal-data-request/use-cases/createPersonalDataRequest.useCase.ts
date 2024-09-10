import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { CreatePersonalDataRequestDto } from 'src/presentation/dto/personal-data-request/create-personal-data-request.dto';
import { GetUserByIdUseCase } from '../../user/use-cases/getUserById.useCase';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class CreatePersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    personalDataRequestData: CreatePersonalDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const user = await this.getUserByIdUseCase.execute(
      new UserId(personalDataRequestData.userId),
    );
    const existingDataRequest =
      await this.personalDataRequestRepository.getPersonalDataRequestByUserId(
        new UserId(personalDataRequestData.userId),
      );
    if (existingDataRequest) {
      throw new BadRequestException(
        `Personal Data Request ${existingDataRequest.id} already requested for User with ID: ${personalDataRequestData.userId}`,
      );
    }
    const dataRequest = new PersonalDataRequest();
    dataRequest.user = user;
    return this.personalDataRequestRepository.createPersonalDataRequest(
      dataRequest,
    );
  }
}
