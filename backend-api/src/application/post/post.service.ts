import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  createPost(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  getAllPosts() {
    return `This action returns all post`;
  }

  getPostById(id: number) {
    return `This action returns a #${id} post`;
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  deletePost(id: number) {
    return `This action removes a #${id} post`;
  }
}
