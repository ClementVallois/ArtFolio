import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { GetAmateurByIdUseCase } from './use-cases/getAmateurById.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Amateur])],
  controllers: [],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    GetAmateurByIdUseCase,
  ],
  exports: [GetAmateurByIdUseCase],
})
export class SharedAmateurModule {}
