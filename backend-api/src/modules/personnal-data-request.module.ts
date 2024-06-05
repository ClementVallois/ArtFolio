import { Module } from '@nestjs/common';
import { PersonnalDataRequestService } from '../application/services/personnal-data-request.service';
import { PersonnalDataRequestController } from '../presentation/controllers/data-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRequest } from 'src/domain/entities/data-request.entity';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataRequest, User])],
  controllers: [PersonnalDataRequestController],
  providers: [PersonnalDataRequestService],
})
export class PersonnalDataRequestModule {}
