import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetAmateurByIdUseCase } from 'src/application/modules/amateur/use-cases/getAmateurById.useCase';
import { User } from 'src/domain/entities/user.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    GetAmateurByIdUseCase,
  ],
  exports: [GetAmateurByIdUseCase],
})
export class SharedAmateurModule {}
