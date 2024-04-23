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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    try {
      return await this.postRepository.find({ order: { createdAt: 'DESC' } });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Post not found with ID: ${id}`);
    }
    return post;
  }

  async getPostAssets(postId: string): Promise<Asset[]> {
    const postAssets = await this.assetRepository.find({
      where: { postId: { id: postId }, type: 'post_picture' },
    });

    if (!postAssets || postAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for Post with ID: ${postId}`,
      );
    }
    return postAssets;
  }

  async createPost(postData: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOneBy({
      id: postData.userId,
    });

    if (!user) {
      throw new NotFoundException(`User not found with ID: ${postData.userId}`);
    }
    const postToCreate = this.postRepository.create({
      ...postData,
      user: user,
    });
    return await this.postRepository.save(postToCreate);
  }

  async updatePost(id: string, postData: UpdatePostDto): Promise<Post> {
    const existingPost = await this.getPostById(id);
    const postToUpdate = this.postRepository.merge(existingPost, postData);
    return this.postRepository.save(postToUpdate);
  }

  async removePost(id: string): Promise<Post> {
    const existingPost = await this.getPostById(id);
    return this.postRepository.remove(existingPost);
  }
}
