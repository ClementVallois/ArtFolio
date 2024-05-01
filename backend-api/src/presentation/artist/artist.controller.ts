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
  UploadedFile,
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
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { AssetService } from 'src/application/asset/asset.service';

@UseGuards(AuthGuard('jwt'))
@Controller(['artists'])
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly assetService: AssetService,
  ) {}

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
    FileInterceptor('profile_picture', {
      dest: 'assets/profile_pictures/',
    }),
  )
  async createArtist(
    @UploadedFile() file: File,
    @Body() artistData: CreateArtistDto,
  ) {
    console.log(file);
    const artist = await this.artistService.createArtist(artistData);
    const asset = await this.assetService.addProfilePicture(artist.id, file);
    return {
      message: 'Artist created successfully',
      artist,
      asset,
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
