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
import { FindIdParams } from '../utils/params.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param() { id }: FindIdParams) {
    return this.userService.getUserById(id);
  }
  @Get(':id/assets')
  async getUserAssets(@Param() { id }: FindIdParams) {
    return this.userService.getUserAssets(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  async updateUser(@Param() { id }: FindIdParams, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async removeUser(@Param() { id }: FindIdParams) {
    return this.userService.deleteUser(id);
  }
}
