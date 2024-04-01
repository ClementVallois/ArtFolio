import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './interfaces/post.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: string) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  createPost(post: CreatePostDto): Post {
    const newPostId = uuidv4();
    const postToCreate = { id: newPostId, ...post };
    this.posts.push(postToCreate);
    return postToCreate;
  }

  updatePost(id: string, post: UpdatePostDto): Post {
    const postToUpdate = this.posts.find((post) => post.id === id);
    if (!postToUpdate) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    if (post.isPinned !== undefined) {
      postToUpdate.isPinned = post.isPinned;
    }
    if (post.description !== undefined) {
      postToUpdate.description = post.description;
    }
    return postToUpdate;
  }

  deletePost(id: string): Post {
    const postToDelete = this.posts.find((post) => post.id === id);
    if (!postToDelete) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    this.posts = this.posts.filter((post) => post.id !== id);
    return postToDelete;
  }
}
