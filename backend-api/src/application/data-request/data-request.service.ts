import { Injectable } from '@nestjs/common';
import { CreateDataRequestDto } from '../../presentation/data-request/dto/create-data-request.dto';
import { UpdateDataRequestDto } from '../../presentation/data-request/dto/update-data-request.dto';

@Injectable()
export class DataRequestService {
  create(createDataRequestDto: CreateDataRequestDto) {
    return 'This action adds a new dataRequest';
  }

  findAll() {
    return `This action returns all dataRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataRequest`;
  }

  update(id: number, updateDataRequestDto: UpdateDataRequestDto) {
    return `This action updates a #${id} dataRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataRequest`;
  }
}
