import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../../application/post/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindIdParams } from '../utils/params.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param() { id }: FindIdParams) {
    return this.postService.getPostById(id);
  }

  @Get(':id/assets')
  async getPostAssets(@Param() { id }: FindIdParams) {
    return this.postService.getPostAssets(id);
  }

  @Post()
  async createPost(@Body() postData: CreatePostDto) {
    return this.postService.createPost(postData);
  }

  @Patch(':id')
  async updatePost(
    @Param() { id }: FindIdParams,
    @Body() postData: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, postData);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindIdParams) {
    return this.postService.deletePost(id);
  }
}
