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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from 'src/application/artist/artist.service';
import {
  FindIdParams,
  FindNumberParams,
  FindUserPostParams,
} from '../utils/params.dto';
import { AuthGuard } from '@nestjs/passport';
import { File } from '@nest-lab/fastify-multer';
import { User } from 'src/infrastructure/entities/user.entity';
import LocalFilesInterceptor from 'src/infrastructure/common/interceptors/file-type.interceptor';

@UseGuards(AuthGuard('jwt'))
@Controller(['artists'])
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param() { id }: FindIdParams) {
    return this.artistService.getArtistById(id);
  }

  @Get(':id/posts')
  async getArtistPosts(@Param() { id }: FindIdParams) {
    return this.artistService.getArtistPosts(id);
  }

  @Get(':id/categories')
  async getArtistCategories(@Param() { id }: FindIdParams) {
    return this.artistService.getArtistCategories(id);
  }

  @Get(':userId/posts/:postId')
  async getOneArtistPost(@Param() params: FindUserPostParams) {
    return this.artistService.getOneArtistPost(params.userId, params.postId);
  }

  @Get('last/:nb')
  async getLastRegisteredArtistsPosts(@Param() params: FindNumberParams) {
    return this.artistService.getLastRegisteredArtistsPosts(params.nb);
  }

  @Get('random/:nb')
  async getRandomArtistsPost(@Param() params: FindNumberParams) {
    return this.artistService.getRandomArtistsPost(params.nb);
  }

  @Post()
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldNames: [
        { name: 'profilePicture', maxCount: 1 },
        { name: 'postPicture', maxCount: 1 },
      ],
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
  async createArtist(
    @UploadedFiles() files: { profilePicture: File[]; postPicture: File[] },
    @Body() artistData: CreateArtistDto,
  ) {
    const artist = await this.artistService.handleCreateArtist(
      artistData,
      files,
    );

    return {
      message: 'Success',
      artistId: artist.id,
    };
  }

  @Patch(':id')
  async updateArtist(
    @Param() { id }: FindIdParams,
    @Body() artistData: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, artistData);
  }

  @Delete(':id')
  async removeArtist(@Param() { id }: FindIdParams) {
    return this.artistService.removeArtist(id);
  }
}
