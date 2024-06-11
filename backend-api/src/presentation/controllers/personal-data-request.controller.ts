import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FindIdParams } from '../utils/params.dto';
import { CreateDataRequestDto } from '../dto/personal-data-request/create-data-request.dto';
import { PersonalDataRequestId } from 'src/domain/value objects/personalDataRequestId';
import { GetAllPersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/getAllPersonalDataRequests.useCase';
import { CreatePersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/createPersonalDataRequest.useCase';
import { GetOnePersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/getOnePersonalDataRequest.useCase';

@Controller('data-requests')
export class PersonalDataRequestController {
  constructor(
    private readonly getAllPersonalDataRequestUseCase: GetAllPersonalDataRequestUseCase,
    private readonly getOnePersonalDataRequestUseCase: GetOnePersonalDataRequestUseCase,
    private readonly createPersonalDataRequestUseCase: CreatePersonalDataRequestUseCase,
  ) {}

  @Get()
  async getAllDataRequests() {
    return this.getAllPersonalDataRequestUseCase.execute();
  }

  @Get(':id')
  async getOneDataRequest(@Param() params: FindIdParams) {
    const personalDataRequestId = new PersonalDataRequestId(params.id);
    return this.getOnePersonalDataRequestUseCase.execute(personalDataRequestId);
  }

  @Post()
  async createDataRequest(@Body() dataRequestData: CreateDataRequestDto) {
    return this.createPersonalDataRequestUseCase.execute(dataRequestData);
  }
}
