import { Module } from '@nestjs/common';
import { DataRequestService } from '../../application/data-request/data-request.service';
import { DataRequestController } from './data-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRequest } from 'src/domain/entities/data-request.entity';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataRequest, User])],
  controllers: [DataRequestController],
  providers: [DataRequestService],
})
export class DataRequestModule {}
