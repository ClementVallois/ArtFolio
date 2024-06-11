import { Module } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserController } from 'src/presentation/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { PersonalDataRequest } from 'src/domain/entities/data-request.entity';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from 'src/application/services/asset.service';
import { Post } from 'src/domain/entities/post.entity';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { ValidationService } from 'src/application/validators/validation.service';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset, PersonalDataRequest, Post])],
  controllers: [UserController],
  providers: [
    { provide: 'IAmateurRepository', useClass: AmateurRepository },
    UserService,
    ValidationService,
    DatabaseErrorHandler,
    ProfilePictureHandler,
    ErrorService,
    FileService,
    AssetService,
  ],
  exports: [UserService],
})
export class UserModule {}
