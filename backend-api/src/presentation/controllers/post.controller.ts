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
import { CreatePostDto } from '../dto/post/create-post.dto';
import { UpdatePostDto } from '../dto/post/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindIdParams } from '../utils/params.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { FastifyReply } from 'fastify';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PostId } from 'src/domain/value objects/postId';

import { SharedPostUseCaseProxy } from 'src/application/shared/modules/post/proxies/sharedPostUseCase.proxy';
import { PostUseCaseProxy } from 'src/application/modules/post/proxies/postUseCase.proxy';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController {
  constructor(
    private readonly postUseCaseProxy: PostUseCaseProxy,
    private readonly sharedPostUseCaseProxy: SharedPostUseCaseProxy,
  ) {}

  @Get()
  async getAllPosts() {
    return this.sharedPostUseCaseProxy.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param() params: FindIdParams) {
    const postId = new PostId(params.id);
    return this.postUseCaseProxy.getPostById(postId);
  }

  @Get(':id/assets')
  async getPostAssets(
    @Param() params: FindIdParams,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const postId = new PostId(params.id);
    const files = await this.postUseCaseProxy.getPostAssets(postId);

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
      return this.sharedPostUseCaseProxy.createPost(postData, file);
    }
  }

  @Patch(':id')
  async updatePost(
    @Param() params: FindIdParams,
    @Body() postData: UpdatePostDto,
  ) {
    const postId = new PostId(params.id);
    return this.postUseCaseProxy.updatePost(postId, postData);
  }

  @Delete(':id')
  async removePost(@Param() params: FindIdParams) {
    const postId = new PostId(params.id);
    return this.postUseCaseProxy.removePost(postId);
  }
}
