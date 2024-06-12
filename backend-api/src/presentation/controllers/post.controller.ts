import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
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

import { GetPostAssetsUseCase } from 'src/application/modules/asset/use-cases/getPostAssets.useCase';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostId } from 'src/domain/value-objects/postId';
import { Post as PostEntity } from 'src/domain/entities/post.entity';
import { GetAllPostsUseCase } from 'src/application/shared/modules/post/use-cases/getAllPosts.useCase';
import { GetPostByIdUseCase } from 'src/application/modules/post/use-cases/getPostById.useCase';
import { CreatePostUseCase } from 'src/application/shared/modules/post/use-cases/createPost.useCase';
import { UpdatePostUseCase } from 'src/application/modules/post/use-cases/updatePost.useCase';
import { RemovePostUseCase } from 'src/application/modules/post/use-cases/removePost.useCase';
import { PermissionsGuard } from '../decorators/permissions/permissions.guard';
import { Permissions } from '../decorators/permissions/permissions.decorator';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly removePostUseCase: RemovePostUseCase,
  ) {}

  /**
   * Get all posts.
   *
   * @returns {Promise<PostEntity[]>} A promise that resolves to an array of all posts.
   */
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'All posts retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:all')
  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.getAllPostsUseCase.execute();
  }

  /**
   * Get a post by ID.
   *
   * @param {FindIdParams} params - The parameters containing the ID of the post.
   * @returns {Promise<PostEntity>} A promise that resolves to the post with the specified ID.
   */
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the post' })
  @ApiResponse({ status: 200, description: 'The post data.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:all')
  @Get(':id')
  async getPostById(@Param() params: FindIdParams): Promise<PostEntity> {
    const postId = new PostId(params.id);
    return this.getPostByIdUseCase.execute(postId);
  }

  /**
   * Get assets for a post.
   *
   * @param {FindIdParams} params - The parameters containing the ID of the post.
   * @param {FastifyReply} response - The response object.
   * @returns {Promise<StreamableFile>} A promise that resolves to the assets of the post.
   */
  @ApiOperation({ summary: 'Get assets for a post' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the post' })
  @ApiResponse({ status: 200, description: 'The post assets.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Post or assets not found' })
  @ApiProduces('image/*')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:all')
  @Get(':id/assets')
  async getPostAssets(
    @Param() params: FindIdParams,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<StreamableFile> {
    const postId = new PostId(params.id);
    const files = await this.getPostAssetsUseCase.execute(postId);

    const stream = createReadStream(join(process.cwd(), files[0].url));
    response.headers({
      'Content-Disposition': `inline; filename="${files[0].id}"`,
      'Content-Type': `${files[0].mimetype}`,
    });
    return new StreamableFile(stream);
  }

  /**
   * Create a new post.
   *
   * @param {File} file - The uploaded file for the post picture.
   * @param {CreatePostDto} postData - The data for creating a new post.
   * @returns {Promise<PostEntity>} A promise that resolves to the newly created post.
   * @throws {BadRequestException} If the post picture file is not provided.
   */
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The post has been created successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('create:post')
  @Post()
  @UseInterceptors(FileInterceptor('postPicture'))
  async createPost(
    @UploadedFile() file: File,
    @Body() postData: CreatePostDto,
  ): Promise<PostEntity> {
    if (!file) {
      throw new BadRequestException('Post picture file is required.');
    } else {
      return this.createPostUseCase.execute(postData, file);
    }
  }

  /**
   * Update a post.
   *
   * @param {FindIdParams} params - The parameters containing the ID of the post to update.
   * @param {UpdatePostDto} postData - The data for updating the post.
   * @returns {Promise<PostEntity>} A promise that resolves to the updated post.
   */
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the post' })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({
    status: 200,
    description: 'The post has been updated successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('update:post')
  @Patch(':id')
  async updatePost(
    @Param() params: FindIdParams,
    @Body() postData: UpdatePostDto,
  ): Promise<PostEntity> {
    const postId = new PostId(params.id);
    return this.updatePostUseCase.execute(postId, postData);
  }

  /**
   * Delete a post.
   *
   * @param {FindIdParams} params - The parameters containing the ID of the post to delete.
   * @returns {Promise<PostEntity>} A promise that resolves to the deleted post.
   */
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been deleted successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('delete:post')
  @Delete(':id')
  async removePost(@Param() params: FindIdParams): Promise<PostEntity> {
    const postId = new PostId(params.id);
    return this.removePostUseCase.execute(postId);
  }
}
