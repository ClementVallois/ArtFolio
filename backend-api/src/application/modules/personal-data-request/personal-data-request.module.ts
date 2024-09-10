import { Module } from '@nestjs/common';
import { PersonalDataRequestController } from '../../../presentation/controllers/personal-data-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
import { GetAllPersonalDataRequestUseCase } from './use-cases/getAllPersonalDataRequests.useCase';
import { GetOnePersonalDataRequestUseCase } from './use-cases/getOnePersonalDataRequest.useCase';
import { CreatePersonalDataRequestUseCase } from './use-cases/createPersonalDataRequest.useCase';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GetAllUserDataUseCase } from './use-cases/getAllUserData.useCase';
import { UpdatePersonalDataRequestUseCase } from './use-cases/updatePersonalDataRequest.useCase';
import { GetAllRequestedPersonalDataRequestUseCase } from './use-cases/getAllRequestedPersonalDataRequest.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalDataRequest]), UserModule],
  controllers: [PersonalDataRequestController],
  providers: [
    PersonalDataRequestRepository,
    {
      provide: 'IPersonalDataRequestRepository',
      useClass: PersonalDataRequestRepository,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    GetAllPersonalDataRequestUseCase,
    GetOnePersonalDataRequestUseCase,
    CreatePersonalDataRequestUseCase,
    UpdatePersonalDataRequestUseCase,
    GetAllRequestedPersonalDataRequestUseCase,
    GetAllUserDataUseCase,
  ],
})
export class PersonalDataRequestModule {}
