import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { GetAmateurByIdUseCase } from './use-cases/getAmateurById.useCase';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    GetAmateurByIdUseCase,
  ],
  exports: [GetAmateurByIdUseCase],
})
export class SharedAmateurModule {}
