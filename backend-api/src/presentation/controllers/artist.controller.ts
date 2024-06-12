import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from '../dto/artist/create-artist.dto';
import { UpdateArtistDto } from '../dto/artist/update-artist.dto';
import {
  FindArtistPostParams,
  FindIdParams,
  FindNumberParams,
} from '../utils/params.dto';
import { AuthGuard } from '@nestjs/passport';
import { File } from '@nest-lab/fastify-multer';
import LocalFilesInterceptor from 'src/infrastructure/common/interceptors/files.interceptor';
import { ArtistUseCaseProxy } from 'src/application/modules/artist/proxies/artistUseCase.proxy';
import { ArtistId } from 'src/domain/value objects/artistId';
import { PostId } from 'src/domain/value objects/postId';
import { SharedArtistUseCaseProxy } from 'src/application/shared/modules/artist/proxies/sharedArtistUseCase.proxy';
import { SharedPostUseCaseProxy } from 'src/application/shared/modules/post/proxies/sharedPostUseCase.proxy';
import { SharedCategoryUseCaseProxy } from 'src/application/shared/modules/category/proxies/sharedCategoryUseCase.proxy';
import { Permissions } from '../decorators/permissions/permissions.decorator';
import { PermissionsGuard } from '../decorators/permissions/permissions.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Artists')
@ApiBearerAuth()
@Controller(['artists'])
export class ArtistController {
  constructor(
    private readonly artistUseCaseProxy: ArtistUseCaseProxy,
    private readonly sharedArtistUseCaseProxy: SharedArtistUseCaseProxy,
    private readonly sharedPostUseCaseProxy: SharedPostUseCaseProxy,
    private readonly sharedCategoryUseCaseProxy: SharedCategoryUseCaseProxy,
  ) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'Return all artists.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @Permissions('delete:post')
  async getAllArtists() {
    return this.artistUseCaseProxy.getAllArtists();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getArtistById(@Param() params: FindIdParams) {
    const artistId = new ArtistId(params.id);
    return this.artistUseCaseProxy.getArtistById(artistId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/posts')
  async getArtistPosts(@Param() params: FindIdParams) {
    const artistId = new ArtistId(params.id);
    return this.sharedPostUseCaseProxy.getAllArtistPosts(artistId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/categories')
  async getArtistCategories(@Param() params: FindIdParams) {
    const artistId = new ArtistId(params.id);
    return this.sharedCategoryUseCaseProxy.getArtistCategories(artistId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':artistId/posts/:postId')
  async getOneArtistPost(@Param() params: FindArtistPostParams) {
    const artistId = new ArtistId(params.artistId);
    const postId = new PostId(params.postId);
    return this.sharedPostUseCaseProxy.getOneArtistPost(artistId, postId);
  }

  @Get('last/:nb')
  async getLastRegisteredArtistsPosts(@Param() params: FindNumberParams) {
    return this.sharedArtistUseCaseProxy.getLastRegisteredArtistsPosts(
      params.nb,
    );
  }

  @Get('random/:nb')
  async getRandomArtistsPost(@Param() params: FindNumberParams) {
    return this.sharedArtistUseCaseProxy.getRandomArtistsPost(params.nb);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldNames: [
        { name: 'profilePicture', maxCount: 1 },
        { name: 'postPicture', maxCount: 1 },
      ],
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const acceptedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (acceptedMimeTypes.includes(file.mimetype)) {
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
  async createArtist(
    @UploadedFiles() files: { profilePicture: File; postPicture: File[] },
    @Body() artistData: CreateArtistDto,
  ) {
    const artist = await this.sharedArtistUseCaseProxy.handleCreateArtist(
      artistData,
      files,
    );

    return {
      message: 'Success',
      artistId: artist.id,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldNames: [{ name: 'profilePicture', maxCount: 1 }],
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const acceptedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (acceptedMimeTypes.includes(file.mimetype)) {
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
  async updateArtist(
    @Param() params: FindIdParams,
    @UploadedFiles() file: { profilePicture: File },
    @Body() artistData: UpdateArtistDto,
  ) {
    const artistId = new ArtistId(params.id);
    return this.sharedArtistUseCaseProxy.handleUpdateArtist(
      artistId,
      artistData,
      file,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async removeArtist(@Param() params: FindIdParams) {
    const artistId = new ArtistId(params.id);
    return this.sharedArtistUseCaseProxy.removeArtist(artistId);
  }
}
