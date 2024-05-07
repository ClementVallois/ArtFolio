import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DataRequestService } from '../../application/data-request/data-request.service';
import { CreateDataRequestDto } from './dto/create-data-request.dto';
import { FindIdParams } from '../utils/params.dto';

@Controller('data-requests')
export class DataRequestController {
  constructor(private readonly dataRequestService: DataRequestService) {}

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
