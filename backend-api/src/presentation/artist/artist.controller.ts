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
} from '../utils/findParams';

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

  @Get(':userId/posts/:postId')
  async getOneArtistPost(@Param() params: FindUserPostParams) {
    return this.artistService.getOneArtistPost(params.userId, params.postId);
  }

  @Get('last/:nb')
  async getLastRegisteredArtistsPosts(@Param() params: FindNumberParams) {
    return this.artistService.getLastRegisteredArtistsPosts(params.nb);
  }

  @Post()
  async createArtist(@Body() artist: CreateArtistDto) {
    return this.artistService.createArtist(artist);
  }

  @Patch(':id')
  async updateArtist(
    @Param() { id }: FindIdParams,
    @Body() artist: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, artist);
  }

  @Delete(':id')
  async removeArtist(@Param() { id }: FindIdParams) {
    return this.artistService.removeArtist(id);
  }
}
