import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PersonnalDataRequestService } from '../../application/services/personnal-data-request.service';
import { CreateDataRequestDto } from '../dto/personnal-data-request/create-data-request.dto';
import { FindIdParams } from '../utils/params.dto';

@Controller('data-requests')
export class PersonnalDataRequestController {
  constructor(
    private readonly dataRequestService: PersonnalDataRequestService,
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
