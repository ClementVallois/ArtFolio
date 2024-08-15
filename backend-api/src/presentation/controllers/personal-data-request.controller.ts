import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Res,
} from '@nestjs/common';
import { FindIdParams } from '../utils/params.dto';
import { CreatePersonalDataRequestDto } from '../dto/personal-data-request/create-personal-data-request.dto';
import { PersonalDataRequestId } from 'src/domain/value-objects/personalDataRequestId';
import { GetAllPersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/getAllPersonalDataRequests.useCase';
import { CreatePersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/createPersonalDataRequest.useCase';
import { GetOnePersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/getOnePersonalDataRequest.useCase';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Permissions } from '../decorators/permissions/permissions.decorator';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { GetAllUserDataUseCase } from 'src/application/modules/personal-data-request/use-cases/getAllUserData.useCase';
import { UpdatePersonalDataRequestDto } from '../dto/personal-data-request/update-personal-data-request.dto';
import { UpdatePersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/updatePersonalDataRequest.useCase';
import { GetAllRequestedPersonalDataRequestUseCase } from 'src/application/modules/personal-data-request/use-cases/getAllRequestedPersonalDataRequest.useCase';
import { createReadStream } from 'fs';
import { FastifyReply } from 'fastify';

@ApiTags('Personal Data Request')
@ApiBearerAuth()
@Controller('personal-data-requests')
export class PersonalDataRequestController {
  constructor(
    private readonly getAllPersonalDataRequestUseCase: GetAllPersonalDataRequestUseCase,
    private readonly getOnePersonalDataRequestUseCase: GetOnePersonalDataRequestUseCase,
    private readonly createPersonalDataRequestUseCase: CreatePersonalDataRequestUseCase,
    private readonly updatePersonalDataRequestUseCase: UpdatePersonalDataRequestUseCase,
    private readonly getAllRequestedPersonalDataRequestUseCase: GetAllRequestedPersonalDataRequestUseCase,
    private readonly getAllUserDataUseCase: GetAllUserDataUseCase,
  ) {}

  /**
   * Get all personal data requests
   * @returns {Promise<PersonalDataRequest[]>} A list of all personal data requests
   */
  @ApiOperation({ summary: 'Get all personal data requests' })
  @ApiResponse({
    status: 200,
    description: 'All personal data requests retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'No personal data requests found' })
  @Permissions('read:personal-data-request')
  @Get()
  async getAllPersonalDataRequests(): Promise<PersonalDataRequest[]> {
    return this.getAllPersonalDataRequestUseCase.execute();
  }

  /**
   * Get all requested personal data requests
   * @returns {Promise<PersonalDataRequest[]>} A list of all requested personal data requests
   */
  @ApiOperation({ summary: 'Get all requested personal data requests' })
  @ApiResponse({
    status: 200,
    description: 'All requested personal data requests retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No requested personal data requests found',
  })
  @Get('requested')
  async getAlRequestedPersonalDataRequests(): Promise<PersonalDataRequest[]> {
    return this.getAllRequestedPersonalDataRequestUseCase.execute();
  }

  /**
   * Get a personal data request by ID
   * @param {FindIdParams} params - Parameters to find the personal data request
   * @returns {Promise<PersonalDataRequest>} The personal data request data
   */
  @ApiOperation({ summary: 'Get a personal data request by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the personal data request',
  })
  @ApiResponse({
    status: 200,
    description: 'The personal data request data.',
  })
  @ApiResponse({ status: 404, description: 'Personal data request not found' })
  @Permissions('read:personal-data-request')
  @Get(':id')
  async getOneDataRequest(
    @Param() params: FindIdParams,
  ): Promise<PersonalDataRequest> {
    const personalDataRequestId = new PersonalDataRequestId(params.id);
    return this.getOnePersonalDataRequestUseCase.execute(personalDataRequestId);
  }

  /**
   * Create a new personal data request
   * @param {CreatePersonalDataRequestDto} dataRequestData - Data to create the personal data request
   * @returns {Promise<PersonalDataRequest>} Confirmation of the created personal data request
   */
  @ApiOperation({ summary: 'Create a new personal data request' })
  @ApiBody({ type: CreatePersonalDataRequestDto })
  @ApiResponse({
    status: 201,
    description: 'The personal data request has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Permissions('create:dataRequest')
  @Post()
  async createDataRequest(
    @Body() dataRequestData: CreatePersonalDataRequestDto,
  ): Promise<PersonalDataRequest> {
    return this.createPersonalDataRequestUseCase.execute(dataRequestData);
  }

  /**
   * Update a personal data request
   * @param {FindIdParams} params - Parameters with the personal data request ID
   * @param {UpdatePersonalDataRequestDto} personalDataRequestData - Data to update the personal data request
   * @returns {Promise<PersonalDataRequest>} The updated personal data request
   */
  @ApiOperation({ summary: 'Update a personal data request' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the personal data request',
  })
  @ApiBody({ type: UpdatePersonalDataRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The personal data request has been updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Personal data request not found' })
  @Permissions('update:personal-data-request')
  @Patch(':id')
  async updateDataRequest(
    @Param() params: FindIdParams,
    @Body() personalDataRequestData: UpdatePersonalDataRequestDto,
  ): Promise<PersonalDataRequest> {
    const personalDataRequestId = new PersonalDataRequestId(params.id);
    return this.updatePersonalDataRequestUseCase.execute(
      personalDataRequestId,
      personalDataRequestData,
    );
  }

  // TODO : Add this delete
  // @Delete(':id')
  // async deleteDataRequest(@Param() params: FindIdParams) {
  //   const personalDataRequestId = new PersonalDataRequestId(params.id);
  //   return this.deletePersonalDataRequestUseCase.execute(personalDataRequestId);
  // }

  //TODO : Add guards and permissions.
  /**
   * Get personal data of a user
   * @param {FindIdParams} params - Parameters with the user ID
   * @returns {Promise<any>} The user's personal data
   */
  @Get('download/:id')
  @ApiOperation({ summary: 'Download personal data of a user' })
  @ApiParam({ name: 'id', description: 'The ID of the personal data request' })
  @ApiResponse({
    status: 200,
    description: "The user's personal data have been fetched successfully.",
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  // @Permissions('download:user-personal-data')
  async downloadPersonalData(
    @Param() requestId: FindIdParams,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    const personalDataRequestId = new PersonalDataRequestId(requestId.id);

    const { filePath, userId } = await this.getAllUserDataUseCase.execute(
      personalDataRequestId,
    );
    const fileStream = createReadStream(filePath);

    reply.header('Content-Type', 'application/json');
    reply.header(
      'Content-Disposition',
      `attachment; filename="user-data-${userId}.json"`,
    );

    return new Promise((resolve, reject) => {
      reply.send(fileStream);
      fileStream.on('end', () => resolve());
      fileStream.on('error', (err) => reject(err));
    });
  }
}
