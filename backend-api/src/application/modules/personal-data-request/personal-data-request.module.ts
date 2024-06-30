import { Module } from '@nestjs/common';
import { PersonalDataRequestController } from '../../../presentation/controllers/personal-data-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { PersonalDataRequestRepository } from 'src/infrastructure/repositories/personal-data-request.repository';
import { GetAllPersonalDataRequestUseCase } from './use-cases/getAllPersonalDataRequests.useCase';
import { GetOnePersonalDataRequestUseCase } from './use-cases/getOnePersonalDataRequest.useCase';
import { CreatePersonalDataRequestUseCase } from './use-cases/createPersonalDataRequest.useCase';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalDataRequest]), UserModule],
  controllers: [PersonalDataRequestController],
  providers: [
    PersonalDataRequestRepository,
    {
      provide: 'IPersonalDataRequestRepository',
      useClass: PersonalDataRequestRepository,
    },

    GetAllPersonalDataRequestUseCase,
    GetOnePersonalDataRequestUseCase,
    CreatePersonalDataRequestUseCase,
  ],
})
export class PersonalDataRequestModule {}
