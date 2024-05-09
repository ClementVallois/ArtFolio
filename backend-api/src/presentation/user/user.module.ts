import { Module } from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import { UserController } from 'src/presentation/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { DataRequest } from 'src/infrastructure/entities/data-request.entity';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from 'src/application/asset/asset.service';
import { Post } from 'src/infrastructure/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset, DataRequest, Post])],
  controllers: [UserController],
  providers: [UserService, ErrorService, FileService, AssetService],
  exports: [UserService],
})
export class UserModule {}
