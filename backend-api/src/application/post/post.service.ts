import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../../presentation/post/dto/create-post.dto';
import { UpdatePostDto } from '../../presentation/post/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/infrastructure/entities/post.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { User } from 'src/infrastructure/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
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
      throw new HttpException('Post ID is required', HttpStatus.BAD_REQUEST);
    }
    const post = await this.postRepository.findOneBy({ id: id });
    if (!post) {
      throw new NotFoundException(`Post not found with ID: ${id}`);
    }
    return post;
  }

  async getPostAssets(postId: string): Promise<Asset[]> {
    const postAssets = await this.assetRepository.find({
      where: { postId: { id: postId } },
    });

    if (!postAssets || postAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for Post with ID: ${postId}`,
      );
    }
    return postAssets;
  }

  async createPost(postData: CreatePostDto): Promise<Post> {
    const postToCreate = this.postRepository.create({
      ...postData,
      userId: { id: postData.userId },
    });
    return await this.postRepository.save(postToCreate);
  }

  async updatePost(id: string, postDto: UpdatePostDto): Promise<Post> {
    const existingPost = await this.getPostById(id);
    if (!existingPost) {
      throw new NotFoundException(`Post with ID '${id}' not found`);
    }
    const userId: DeepPartial<User> = {
      id: postDto.userId,
    };
    const updatedPost: DeepPartial<Post> = {
      ...existingPost,
      ...postDto,
      userId: userId,
    };
    this.postRepository.merge(existingPost, updatedPost);
    return this.postRepository.save(existingPost);
  }

  async deletePost(id: string): Promise<Post> {
    const existingPost = await this.getPostById(id);
    return this.postRepository.remove(existingPost);
  }
}
