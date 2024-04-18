import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindIdParams } from '../utils/findParams';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() { id }: FindIdParams) {
    return this.userService.getUserById(id);
  }
  @Get(':id/assets')
  getUserAssets(@Param() { id }: FindIdParams) {
    return this.userService.getUserAssets(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  updateUser(@Param() { id }: FindIdParams, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  removeUser(@Param() { id }: FindIdParams) {
    return this.userService.deleteUser(id);
  }
}
