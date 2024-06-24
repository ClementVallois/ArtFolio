import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { CreateAmateurUseCase } from './use-cases/createAmateur.useCase';
import { GetAllAmateursUseCase } from './use-cases/getAllAmateurs.useCase';
import { AmateurController } from 'src/presentation/controllers/amateur.controller';
import { UpdateAmateurUseCase } from './use-cases/updateAmateur.useCase';
import { RemoveAmateurUseCase } from './use-cases/removeAmateur.useCase';
import { CommonModule } from 'src/application/common/common.module';
import { SharedAmateurModule } from 'src/application/shared/modules/amateur/shared-amateur.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CommonModule),
    forwardRef(() => SharedAmateurModule),
  ],
  controllers: [AmateurController],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    CreateAmateurUseCase,
    GetAllAmateursUseCase,
    UpdateAmateurUseCase,
    RemoveAmateurUseCase,
  ],
})
export class AmateurModule {}
