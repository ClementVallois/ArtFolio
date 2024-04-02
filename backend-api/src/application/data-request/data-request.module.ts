import { Module } from '@nestjs/common';
import { DataRequestService } from './data-request.service';
import { DataRequestController } from '../../presentation/data-request/data-request.controller';

@Module({
  controllers: [DataRequestController],
  providers: [DataRequestService],
})
export class DataRequestModule {}
