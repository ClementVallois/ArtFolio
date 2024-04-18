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
import { FindIdParams } from '../utils/findParams';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindIdParams) {
    return this.postService.getPostById(id);
  }

  @Get(':id/assets')
  getPostAssets(@Param() { id }: FindIdParams) {
    return this.postService.getPostAssets(id);
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  @Patch(':id')
  async updatePost(@Param() { id }: FindIdParams, @Body() post: UpdatePostDto) {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindIdParams) {
    return this.postService.deletePost(id);
  }
}
