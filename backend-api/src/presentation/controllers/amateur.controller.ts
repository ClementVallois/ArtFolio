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
import { CreateUserDto } from '../dto/amateur/create-user.dto';
import { UpdateUserDto } from '../dto/amateur/update-user.dto';
import { FindIdParams } from '../utils/params.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FastifyReply } from 'fastify';
import { File } from '@nest-lab/fastify-multer';
import LocalFilesInterceptor from 'src/infrastructure/common/interceptors/files.interceptor';
import { CreateAmateurUseCase } from 'src/application/modules/amateur/use-cases/createAmateur.useCase';
import { GetAllAmateursUseCase } from 'src/application/modules/amateur/use-cases/getAllAmateurs.useCase';
import { GetAmateurByIdUseCase } from 'src/application/modules/amateur/use-cases/getAmateurById.useCase';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { GetUserAssetsUseCase } from 'src/application/modules/amateur/use-cases/getAmateurAssets.useCase';
import { UpdateAmateurUseCase } from 'src/application/modules/amateur/use-cases/updateAmateur.useCase';
import { RemoveAmateurUseCase } from 'src/application/modules/amateur/use-cases/removeAmateur.useCase';

@Controller('amateurs')
export class AmateurController {
  constructor(
    private readonly getAllAmateursUseCase: GetAllAmateursUseCase,
    private readonly createAmateurUseCase: CreateAmateurUseCase,
    private readonly getAmateurByIdUseCase: GetAmateurByIdUseCase,
    private readonly getUserAssetsUseCase: GetUserAssetsUseCase,
    private readonly updateAmateurUseCase: UpdateAmateurUseCase,
    private readonly removeAmateurUseCase: RemoveAmateurUseCase,
  ) {}

  @Get()
  async getAllAmateurs() {
    return this.getAllAmateursUseCase.execute();
  }

  @Get(':id')
  async getAmateurById(@Param() params: FindIdParams) {
    const amateurId = new AmateurId(params.id);
    return this.getAmateurByIdUseCase.execute(amateurId);
  }
  @Get(':id/assets')
  async getUserAssets(
    @Param() params: FindIdParams,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const id = new AmateurId(params.id);
    const file = await this.getUserAssetsUseCase.execute(id);

    const stream = createReadStream(join(process.cwd(), file[0].url));
    response.headers({
      'Content-Disposition': `inline; filename="${file[0].id}"`,
      'Content-Type': `${file[0].mimetype}`,
    });
    return new StreamableFile(stream);
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
    const user = await this.createAmateurUseCase.execute(userData, files);

    return {
      message: 'Success',
      userId: user.id,
    };
  }

  @Patch(':id')
  async updateAmateur(
    @Param() params: FindIdParams,
    @Body() userData: UpdateUserDto,
  ) {
    const id = new AmateurId(params.id);
    return this.updateAmateurUseCase.execute(id, userData);
  }

  @Delete(':id')
  async removeAmateur(@Param() params: FindIdParams) {
    const id = new AmateurId(params.id);
    return this.removeAmateurUseCase.execute(id);
  }
}
