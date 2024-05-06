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
import { File, FileFieldsInterceptor } from '@nest-lab/fastify-multer';
import { PostService } from 'src/application/post/post.service';
import { CategoryService } from 'src/application/category/category.service';

@UseGuards(AuthGuard('jwt'))
@Controller(['artists'])
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
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
  //TODO : Add a custom interceptor to filter the file type and more
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'postPicture', maxCount: 1 },
    ]),
  )
  async createArtist(
    @UploadedFiles() files: { profilePicture?: File[]; postPicture?: File[] },
    @Body() artistData: CreateArtistDto,
  ) {
    if (!files.profilePicture || files.profilePicture.length === 0) {
      throw new BadRequestException('Profile picture file is required.');
    }
    if (!files.postPicture || files.postPicture.length === 0) {
      throw new BadRequestException('Post picture file is required.');
    }

    if (
      !artistData.selectedCategories ||
      artistData.selectedCategories.categories.length === 0
    ) {
      throw new BadRequestException('Category is required.');
    }

    const profilePicture = files.profilePicture[0];
    const postPicture = files.postPicture[0];

    const artist = await this.artistService.createArtist(
      artistData,
      profilePicture,
    );

    const postData = {
      isPinned: artistData.pinnedPost.isPinned,
      description: artistData.pinnedPost.description,
      userId: artist.id,
    };

    await this.postService.createPost(postData, postPicture);

    await this.categoryService.assignCategoriesToArtist(
      artist.id,
      artistData.selectedCategories.categories,
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
