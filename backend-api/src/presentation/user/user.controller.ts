import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindIdParams } from '../utils/params.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FastifyReply } from 'fastify';

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
  async getUserAssets(
    @Param() { id }: FindIdParams,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const file = await this.userService.getUserAssets(id);

    const stream = createReadStream(join(process.cwd(), file[0].url));
    response.headers({
      'Content-Disposition': `inline; filename="${file[0].id}"`,
      'Content-Type': `${file[0].mimetype}`,
    });
    return new StreamableFile(stream);
  }

  @Get(':id/data-requests')
  async getUserDataRequests(@Param() { id }: FindIdParams) {
    return this.userService.getUserDataRequests(id);
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
