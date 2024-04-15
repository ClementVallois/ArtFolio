import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from 'src/presentation/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
