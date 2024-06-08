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
  BadRequestException,
  Res,
  StreamableFile,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from '../../application/services/post.service';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { UpdatePostDto } from '../dto/post/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindIdParams } from '../utils/params.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { FastifyReply } from 'fastify';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PostId } from 'src/domain/value objects/postId';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    console.log('Controlleur');

    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param() params: FindIdParams) {
    const postId = new PostId(params.id);
    return this.postService.getPostById(postId);
  }

  @Get(':id/assets')
  async getPostAssets(
    @Param() { id }: FindIdParams,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const files = await this.postService.getPostAssets(id);

    const stream = createReadStream(join(process.cwd(), files[0].url));
    response.headers({
      'Content-Disposition': `inline; filename="${files[0].id}"`,
      'Content-Type': `${files[0].mimetype}`,
    });
    return new StreamableFile(stream);
  }

  @Post()
  @UseInterceptors(FileInterceptor('postPicture'))
  async createPost(
    @UploadedFile() file: File,
    @Body() postData: CreatePostDto,
  ) {
    if (!file) {
      throw new BadRequestException('Post picture file is required.');
    } else {
      return this.postService.createPost(postData, file);
    }
  }

  @Patch(':id')
  async updatePost(
    @Param() params: FindIdParams,
    @Body() postData: UpdatePostDto,
  ) {
    const postId = new PostId(params.id);
    return this.postService.updatePost(postId, postData);
  }

  @Delete(':id')
  async removePost(@Param() params: FindIdParams) {
    const postId = new PostId(params.id);
    return this.postService.removePost(postId);
  }
}
