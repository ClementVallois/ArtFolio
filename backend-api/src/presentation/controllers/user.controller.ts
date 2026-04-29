import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { FindAuth0IdParams, FindIdParams } from '../utils/params.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { GetUserByIdUseCase } from 'src/application/modules/user/use-cases/getUserById.useCase';
import { GetUserByAuth0IdUseCase } from 'src/application/modules/user/use-cases/getUserByAuth0Id.useCase';
import { GetUserDataRequestsUseCase } from 'src/application/modules/user/use-cases/getUserDataRequests.useCase';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { UserId } from 'src/domain/value-objects/userId';
import { User } from 'src/domain/entities/user.entity';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByAuth0IdUseCase: GetUserByAuth0IdUseCase,
    private readonly getUserDataRequestsUseCase: GetUserDataRequestsUseCase,
    private readonly profilePictureService: ProfilePictureService,
  ) {}

  @Get(':id')
  async getUserById(@Param() { id }: FindIdParams): Promise<User> {
    const userId = new UserId(id);
    return this.getUserByIdUseCase.execute(userId);
  }

  @Get(':id/assets')
  async getUserAssets(
    @Param() { id }: FindIdParams,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<StreamableFile> {
    const userId = new UserId(id);
    return this.profilePictureService.streamUserAssets(userId, response);
  }

  @Get('auth0Id/:auth0Id')
  async getUserByAuth0Id(
    @Param() { auth0Id }: FindAuth0IdParams,
  ): Promise<User> {
    return this.getUserByAuth0IdUseCase.execute(auth0Id);
  }

  @Get(':id/data-requests')
  async getUserDataRequests(
    @Param() { id }: FindIdParams,
  ): Promise<PersonalDataRequest[]> {
    const userId = new UserId(id);
    return this.getUserDataRequestsUseCase.execute(userId);
  }
}
