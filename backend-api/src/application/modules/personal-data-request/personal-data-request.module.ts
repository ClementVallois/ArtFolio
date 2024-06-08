import { Module } from '@nestjs/common';
import { PersonalDataRequestService } from '../../services/personal-data-request.service';
import { PersonalDataRequestController } from '../../../presentation/controllers/data-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRequest } from 'src/domain/entities/data-request.entity';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataRequest, User])],
  controllers: [PersonalDataRequestController],
  providers: [PersonalDataRequestService],
})
export class PersonalDataRequestModule {}
