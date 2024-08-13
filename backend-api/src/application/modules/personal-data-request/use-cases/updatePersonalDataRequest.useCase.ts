import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { UpdatePersonalDataRequestDto } from 'src/presentation/dto/personal-data-request/update-personal-data-request.dto';
import { PersonalDataRequestId } from 'src/domain/value-objects/personalDataRequestId';
import { GetOnePersonalDataRequestUseCase } from './getOnePersonalDataRequest.useCase';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
@Injectable()
export class UpdatePersonalDataRequestUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
    private readonly getOnePersonalDataRequestUseCase: GetOnePersonalDataRequestUseCase,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    personalDataRequestId: PersonalDataRequestId,
    personalDataRequestData: UpdatePersonalDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const personalDataRequest =
      await this.getOnePersonalDataRequestUseCase.execute(
        personalDataRequestId,
      );
    try {
      return await this.personalDataRequestRepository.updatePersonalDataRequest(
        new PersonalDataRequestId(personalDataRequest.id),
        personalDataRequestData,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
