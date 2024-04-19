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
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Patch(':id')
  async updateUser(
    @Param() { id }: FindIdParams,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async removeUser(@Param() { id }: FindIdParams) {
    return this.userService.removeUser(id);
  }
}
