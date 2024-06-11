import { Module } from '@nestjs/common';
import { PersonalDataRequestService } from '../../services/personal-data-request.service';
import { PersonalDataRequestController } from '../../../presentation/controllers/personal-data-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { User } from 'src/domain/entities/user.entity';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
import { GetAllPersonalDataRequestUseCase } from './use-cases/getAllPersonalDataRequests.useCase';
import { GetOnePersonalDataRequestUseCase } from './use-cases/getOnePersonalDataRequest.useCase';
import { CreatePersonalDataRequestUseCase } from './use-cases/createPersonalDataRequest.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalDataRequest, User])],
  controllers: [PersonalDataRequestController],
  providers: [
    PersonalDataRequestRepository,
    {
      provide: 'IPersonalDataRequestRepository',
      useClass: PersonalDataRequestRepository,
    },
    PersonalDataRequestService,
    GetAllPersonalDataRequestUseCase,
    GetOnePersonalDataRequestUseCase,
    CreatePersonalDataRequestUseCase,
  ],
})
export class PersonalDataRequestModule {}
