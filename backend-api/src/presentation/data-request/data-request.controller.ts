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
import { CreateDataRequestDto } from '../../application/data-request/dto/create-data-request.dto';
import { UpdateDataRequestDto } from '../../application/data-request/dto/update-data-request.dto';

@Controller('data-request')
export class DataRequestController {
  constructor(private readonly dataRequestService: DataRequestService) {}

  @Post()
  create(@Body() createDataRequestDto: CreateDataRequestDto) {
    return this.dataRequestService.create(createDataRequestDto);
  }

  @Get()
  findAll() {
    return this.dataRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataRequestDto: UpdateDataRequestDto,
  ) {
    return this.dataRequestService.update(+id, updateDataRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataRequestService.remove(+id);
  }
}
