import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PersonalDataRequestService } from '../../application/services/personal-data-request.service';
import { FindIdParams } from '../utils/params.dto';
import { CreateDataRequestDto } from '../dto/personal-data-request/create-data-request.dto';

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
  async getOneDataRequest(@Param() { id }: FindIdParams) {
    return this.dataRequestService.getOneDataRequest(id);
  }

  @Post()
  async createDataRequest(@Body() dataRequestData: CreateDataRequestDto) {
    return this.dataRequestService.createDataRequest(dataRequestData);
  }
}
