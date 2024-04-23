import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataRequestService } from '../../application/data-request/data-request.service';
import { CreateDataRequestDto } from './dto/create-data-request.dto';
import { UpdateDataRequestDto } from './dto/update-data-request.dto';
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

  @Patch(':id')
  async update(
    @Param() { id }: FindIdParams,
    @Body() dataRequestData: UpdateDataRequestDto,
  ) {
    return this.dataRequestService.update(id, dataRequestData);
  }

  @Delete(':id')
  async remove(@Param() { id }: FindIdParams) {
    return this.dataRequestService.remove(id);
  }
}
