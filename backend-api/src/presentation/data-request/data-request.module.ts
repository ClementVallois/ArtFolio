import { Module } from '@nestjs/common';
import { DataRequestService } from '../../application/data-request/data-request.service';
import { DataRequestController } from './data-request.controller';

@Module({
  controllers: [DataRequestController],
  providers: [DataRequestService],
})
export class DataRequestModule {}
