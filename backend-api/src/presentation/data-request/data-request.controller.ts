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
  async create(@Body() createDataRequestDto: CreateDataRequestDto) {
    return this.dataRequestService.create(createDataRequestDto);
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
    @Body() updateDataRequestDto: UpdateDataRequestDto,
  ) {
    return this.dataRequestService.update(+id, updateDataRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dataRequestService.remove(+id);
  }
}
