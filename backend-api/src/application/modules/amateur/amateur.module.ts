import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { CreateAmateurUseCase } from './use-cases/createAmateur.useCase';
import { GetAllAmateursUseCase } from './use-cases/getAllAmateurs.useCase';
import { AmateurController } from 'src/presentation/controllers/amateur.controller';
import { UpdateAmateurUseCase } from './use-cases/updateAmateur.useCase';
import { RemoveAmateurUseCase } from './use-cases/removeAmateur.useCase';
import { CommonModule } from 'src/application/common/common.module';
import { SharedAmateurModule } from 'src/application/shared/modules/amateur/shared-amateur.module';
import { SharedFileModule } from 'src/application/handlers/shared-file.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Amateur]),
    forwardRef(() => CommonModule),
    forwardRef(() => SharedAmateurModule),
    SharedFileModule,
  ],
  controllers: [AmateurController],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    CreateAmateurUseCase,
    GetAllAmateursUseCase,
    UpdateAmateurUseCase,
    RemoveAmateurUseCase,
  ],
})
export class AmateurModule {}
