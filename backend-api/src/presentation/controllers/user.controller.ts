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
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../dto/amateur/create-user.dto';
import { UpdateUserDto } from '../dto/amateur/update-user.dto';
import { FindAuth0IdParams, FindIdParams } from '../utils/params.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FastifyReply } from 'fastify';
import { File } from '@nest-lab/fastify-multer';
import LocalFilesInterceptor from 'src/infrastructure/common/interceptors/files.interceptor';

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

  @Get('auth0Id/:auth0Id')
  async getUserByAuth0Id(@Param() { auth0Id }: FindAuth0IdParams) {
    return this.userService.getUserByAuth0Id(auth0Id);
  }

  @Get(':id/data-requests')
  async getUserDataRequests(@Param() { id }: FindIdParams) {
    return this.userService.getUserDataRequests(id);
  }

  @Post()
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldNames: [{ name: 'profilePicture', maxCount: 1 }],
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
      },
    }),
  )
  @Post()
  async createUser(
    @UploadedFiles() files: { profilePicture: File },
    @Body() userData: CreateUserDto,
  ) {
    const user = await this.userService.handleCreateUser(userData, files);

    return {
      message: 'Success',
      userId: user.id,
    };
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
