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
} from '@nestjs/common';
import { FindIdParams } from '../utils/params.dto';
import { File } from '@nest-lab/fastify-multer';
import LocalFilesInterceptor from 'src/infrastructure/common/interceptors/files.interceptor';
import { CreateAmateurUseCase } from 'src/application/modules/amateur/use-cases/createAmateur.useCase';
import { GetAllAmateursUseCase } from 'src/application/modules/amateur/use-cases/getAllAmateurs.useCase';
import { GetAmateurByIdUseCase } from 'src/application/modules/amateur/use-cases/getAmateurById.useCase';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { UpdateAmateurUseCase } from 'src/application/modules/amateur/use-cases/updateAmateur.useCase';
import { RemoveAmateurUseCase } from 'src/application/modules/amateur/use-cases/removeAmateur.useCase';
import { CreateAmateurDto } from '../dto/amateur/create-amateur.dto';
import { UpdateAmateurDto } from '../dto/amateur/update-amateur.dto';

@Controller('amateurs')
export class AmateurController {
  constructor(
    private readonly getAllAmateursUseCase: GetAllAmateursUseCase,
    private readonly createAmateurUseCase: CreateAmateurUseCase,
    private readonly getAmateurByIdUseCase: GetAmateurByIdUseCase,
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
    @Body() userData: CreateAmateurDto,
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
    @Body() userData: UpdateAmateurDto,
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
