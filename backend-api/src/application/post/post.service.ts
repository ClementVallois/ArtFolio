import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './interfaces/post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/domain/post/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  private posts: Post[] = [];

  getAllPosts() {
    return this.postRepository.find();
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(post);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: string, post: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, post);
    const updatedPost = await this.postRepository.findOneBy({ id });
    if (!updatedPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return updatedPost;
  }

  async deletePost(id: string): Promise<Post> {
    const postToDelete = await this.postRepository.findOneBy({ id });
    if (!postToDelete) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.remove(postToDelete);
    return postToDelete;
  }
}
