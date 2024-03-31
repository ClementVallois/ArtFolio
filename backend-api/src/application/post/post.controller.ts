import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  /**
   * Retrieves all posts from the post service.
   *
   * @return {Promise<Post[]>} A promise that resolves to an array of Post objects.
   */
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  /**
   *
   * @param {string} id - description of parameter
   * @return {type} description of return value
   */
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(+id);
  }

  @Post()
  /**
   * A description of the entire function.
   *
   * @param {type} createPostDto - description of parameter
   * @return {type} description of return value
   */
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Patch(':id')
  /**
   * Updates a post with the given ID using the provided data.
   *
   * @param {string} id - The ID of the post to update.
   * @param {UpdatePostDto} updatePostDto - The data to update the post with.
   * @return {Promise<Post>} - A promise that resolves to the updated post.
   */
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  /**
   * Delete a post.
   *
   * @param {string} id - the ID of the post to be deleted
   * @return {Promise<void>} a Promise that resolves when the post is deleted
   */
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(+id);
  }
}
