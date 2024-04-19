import { Module } from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import { UserController } from 'src/presentation/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { Asset } from 'src/infrastructure/entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
