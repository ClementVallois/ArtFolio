import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../../presentation/post/dto/create-post.dto';
import { UpdatePostDto } from '../../presentation/post/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/infrastructure/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    try {
      return await this.postRepository.find();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPostById(id: string): Promise<Post> {
    if (!id) {
      throw new NotAcceptableException('Post ID is required');
    }
    const post = await this.postRepository.findOneBy({ id: id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    const postToCreate = this.postRepository.create(post);
    return await this.postRepository.save(postToCreate);
  }

  async updatePost(id: string, post: UpdatePostDto): Promise<Post> {
    const existingPost = await this.getPostById(id);
    this.postRepository.merge(existingPost, post);
    return this.postRepository.save(existingPost);
  }

  async deletePost(id: string): Promise<Post> {
    const post = await this.getPostById(id);
    return this.postRepository.remove(post);
  }
}
