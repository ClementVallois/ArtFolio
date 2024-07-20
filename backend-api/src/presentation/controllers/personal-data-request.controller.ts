import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FindIdParams } from '../utils/params.dto';
import { CreateDataRequestDto } from '../dto/personal-data-request/create-data-request.dto';
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

@ApiTags('Personal Data Request')
@ApiBearerAuth()
@Controller('personal-data-requests')
export class PersonalDataRequestController {
  constructor(
    private readonly getAllPersonalDataRequestUseCase: GetAllPersonalDataRequestUseCase,
    private readonly getOnePersonalDataRequestUseCase: GetOnePersonalDataRequestUseCase,
    private readonly createPersonalDataRequestUseCase: CreatePersonalDataRequestUseCase,
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
  async getAllDataRequests(): Promise<PersonalDataRequest[]> {
    return this.getAllPersonalDataRequestUseCase.execute();
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
   * @param {CreateDataRequestDto} dataRequestData - Data to create the personal data request
   * @returns {Promise<PersonalDataRequest>} Confirmation of the created personal data request
   */
  @ApiOperation({ summary: 'Create a new personal data request' })
  @ApiBody({ type: CreateDataRequestDto })
  @ApiResponse({
    status: 201,
    description: 'The personal data request has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Permissions('create:dataRequest')
  @Post()
  async createDataRequest(
    @Body() dataRequestData: CreateDataRequestDto,
  ): Promise<PersonalDataRequest> {
    return this.createPersonalDataRequestUseCase.execute(dataRequestData);
  }
}
