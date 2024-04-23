import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from 'src/application/artist/artist.service';
import {
  FindIdParams,
  FindNumberParams,
  FindUserPostParams,
} from '../utils/params.dto';

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
  async createArtist(@Body() artistData: CreateArtistDto) {
    return this.artistService.createArtist(artistData);
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
