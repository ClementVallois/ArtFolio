import { Module } from '@nestjs/common';
import { UserService } from '../../services/amateur.service';
import { UserController } from 'src/presentation/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { DataRequest } from 'src/domain/entities/data-request.entity';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from 'src/application/services/asset.service';
import { Post } from 'src/domain/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset, DataRequest, Post])],
  controllers: [UserController],
  providers: [UserService, ErrorService, FileService, AssetService],
  exports: [UserService],
})
export class UserModule {}
