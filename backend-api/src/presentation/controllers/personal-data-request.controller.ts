import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PersonalDataRequestService } from '../../application/services/personal-data-request.service';
import { FindIdParams } from '../utils/params.dto';
import { CreateDataRequestDto } from '../dto/personal-data-request/create-data-request.dto';
import { PersonalDataRequestId } from 'src/domain/value objects/personalDataRequestId';

@Controller('data-requests')
export class PersonalDataRequestController {
  constructor(
    private readonly dataRequestService: PersonalDataRequestService,
  ) {}

  @Get()
  async getAllDataRequests() {
    return this.dataRequestService.getAllDataRequests();
  }

  @Get(':id')
  async getOneDataRequest(@Param() params: FindIdParams) {
    const personalDataRequestId = new PersonalDataRequestId(params.id);
    return this.dataRequestService.getOneDataRequest(personalDataRequestId);
  }

  @Post()
  async createDataRequest(@Body() dataRequestData: CreateDataRequestDto) {
    return this.dataRequestService.createDataRequest(dataRequestData);
  }
}
