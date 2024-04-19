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

@Controller('data-requests')
export class DataRequestController {
  constructor(private readonly dataRequestService: DataRequestService) {}

  @Post()
  async create(@Body() dataRequestData: CreateDataRequestDto) {
    return this.dataRequestService.create(dataRequestData);
  }

  @Get()
  async findAll() {
    return this.dataRequestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dataRequestService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dataRequestData: UpdateDataRequestDto,
  ) {
    return this.dataRequestService.update(+id, dataRequestData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dataRequestService.remove(+id);
  }
}
