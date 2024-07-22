import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  UseGuards,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FindIdParams } from '../utils/params.dto';
import { File } from '@nest-lab/fastify-multer';
import LocalFilesInterceptor from 'src/infrastructure/common/interceptors/files.interceptor';
import { CreateAmateurUseCase } from 'src/application/modules/amateur/use-cases/createAmateur.useCase';
import { GetAllAmateursUseCase } from 'src/application/modules/amateur/use-cases/getAllAmateurs.useCase';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { UpdateAmateurUseCase } from 'src/application/modules/amateur/use-cases/updateAmateur.useCase';
import { RemoveAmateurUseCase } from 'src/application/modules/amateur/use-cases/removeAmateur.useCase';
import { CreateAmateurDto } from '../dto/amateur/create-amateur.dto';
import { UpdateAmateurDto } from '../dto/amateur/update-amateur.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../decorators/permissions/permissions.guard';
import { Permissions } from '../decorators/permissions/permissions.decorator';
import { GetAmateurByIdUseCase } from 'src/application/shared/modules/amateur/use-cases/getAmateurById.useCase';
import { FastifyReply } from 'fastify';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';

@ApiTags('Amateurs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('amateurs')
export class AmateurController {
  constructor(
    private readonly getAllAmateursUseCase: GetAllAmateursUseCase,
    private readonly createAmateurUseCase: CreateAmateurUseCase,
    private readonly getAmateurByIdUseCase: GetAmateurByIdUseCase,
    private readonly updateAmateurUseCase: UpdateAmateurUseCase,
    private readonly removeAmateurUseCase: RemoveAmateurUseCase,
    private readonly profilePictureService: ProfilePictureService,
  ) {}

  /**
   * Get all amateurs
   * @returns {Promise<Amateur[]>} A list of all amateurs
   */
  @ApiOperation({ summary: 'Get all amateurs' })
  @ApiResponse({
    status: 200,
    description: 'All amateurs retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'No amateurs found' })
  @Permissions('read:all')
  @Get()
  async getAllAmateurs(): Promise<Amateur[]> {
    return this.getAllAmateursUseCase.execute();
  }

  /**
   * Get an amateur by ID
   * @param {FindIdParams} params - Parameters to find the amateur
   * @returns {Promise<Amateur>} The amateur data
   */
  @ApiOperation({ summary: 'Get an amateur by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the amateur',
  })
  @ApiResponse({ status: 200, description: 'The amateur data.' })
  @ApiResponse({ status: 404, description: 'Amateur not found' })
  @Permissions('read:all')
  @Get(':id')
  async getAmateurById(@Param() params: FindIdParams): Promise<Amateur> {
    const amateurId = new AmateurId(params.id);
    return this.getAmateurByIdUseCase.execute(amateurId);
  }

  /**
   * Get amateur profile picture
   * @param {FindIdParams} params - Parameters to find the amateur
   * @param {FastifyReply} response - Fastify response object
   * @returns {Promise<StreamableFile>} - Streamable file of the amateur's profile picture
   */
  @ApiOperation({ summary: 'Get amateur profile picture' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the amateur',
  })
  @ApiResponse({
    status: 200,
    description: 'Amateur profile picture retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Amateur profile picture not found',
  })
  @Get(':id/assets')
  async getAmateurProfilePicture(
    @Param() params: FindIdParams,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<StreamableFile> {
    const amateurId = new AmateurId(params.id);
    return this.profilePictureService.streamUserAssets(amateurId, response);
  }

  /**
   * Create a new amateur
   * @param {CreateAmateurDto} amateurData - Data to create the amateur
   * @param {File} files - Uploaded file for profile picture
   * @returns {Promise<{ message: string; amateurId: string }>} Confirmation message and amateur ID
   */
  @ApiOperation({ summary: 'Create a new amateur' })
  @ApiBody({ type: CreateAmateurDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The amateur has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @Permissions('create:amateur')
  @Post()
  async createAmateur(
    @UploadedFiles() files: { profilePicture: File },
    @Body() amateurData: CreateAmateurDto,
  ): Promise<{ message: string; amateurId: string }> {
    const amateur = await this.createAmateurUseCase.execute(amateurData, files);
    return {
      message: 'Success',
      amateurId: amateur.id,
    };
  }

  /**
   * Update an amateur
   * @param {FindIdParams} params - Parameters to find the amateur
   * @param {UpdateAmateurDto} amateurData - Data to update the amateur
   * @returns {Promise<Amateur>} The updated amateur data
   */
  @ApiOperation({ summary: 'Update an amateur' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the amateur',
  })
  @ApiBody({ type: UpdateAmateurDto })
  @ApiResponse({
    status: 200,
    description: 'The amateur has been updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Amateur not found' })
  // @Permissions('update:amateur')
  @Patch(':id')
  async updateAmateur(
    @Param() params: FindIdParams,
    @Body() amateurData: UpdateAmateurDto,
  ): Promise<Amateur> {
    const id = new AmateurId(params.id);
    return this.updateAmateurUseCase.execute(id, amateurData);
  }

  /**
   * Delete an amateur
   * @param {FindIdParams} params - Parameters to find the amateur
   * @returns {Promise<Amateur>} The deleted amateur data
   */
  @ApiOperation({ summary: 'Delete an amateur' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the amateur',
  })
  @ApiResponse({
    status: 200,
    description: 'The amateur has been deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Amateur not found' })
  @Permissions('delete:amateur')
  @Delete(':id')
  async removeAmateur(@Param() params: FindIdParams): Promise<Amateur> {
    const id = new AmateurId(params.id);
    return this.removeAmateurUseCase.execute(id);
  }
}
