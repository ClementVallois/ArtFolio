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
import { FindIdParams } from '../utils/findOneParams';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param() { id }: FindIdParams) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Patch(':id')
  updateArtist(
    @Param() { id }: FindIdParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id);
  }

  @Delete(':id')
  removeArtist(@Param() { id }: FindIdParams) {
    return this.artistService.removeArtist(id);
  }
}
