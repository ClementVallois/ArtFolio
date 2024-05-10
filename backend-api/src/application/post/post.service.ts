import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../../presentation/post/dto/create-post.dto';
import { UpdatePostDto } from '../../presentation/post/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/infrastructure/entities/post.entity';
import { Repository } from 'typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { File } from '@nest-lab/fastify-multer';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
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

  async getArtistPinnedPost(artistId: string): Promise<Post> {
    const pinnedPost = await this.postRepository.findOne({
      where: { user: { id: artistId }, isPinned: true },
    });

    if (!pinnedPost) {
      throw new NotFoundException(
        `Pinned post not found for artist with ID: ${artistId}`,
      );
    }

    return pinnedPost;
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

  async getOneArtistPost(userId: string, postId: string): Promise<Post> {
    const artistPost = await this.postRepository.findOne({
      where: { user: { id: userId }, id: postId },
    });
    if (!artistPost) {
      throw new NotFoundException(
        `Post not found for Artist with ID: ${userId} and Post ID: ${postId}`,
      );
    }
    return artistPost;
  }

  async getArtistPosts(id: string): Promise<Post[]> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`Artist not found with ID: ${id}`);
    }
    const pinnedPosts = await this.postRepository.find({
      where: { user: { id: id }, isPinned: true },
      order: { createdAt: 'DESC' },
    });

    const nonPinnedPosts = await this.postRepository.find({
      where: { user: { id: id }, isPinned: false },
      order: { createdAt: 'DESC' },
    });

    const artistPosts = [...pinnedPosts, ...nonPinnedPosts];

    if (!artistPosts || artistPosts.length === 0) {
      throw new NotFoundException(`Posts not found for Artist with ID: ${id}`);
    }
    return artistPosts;
  }

  async createPost(postData: CreatePostDto, postPicture: File): Promise<Post> {
    if (!postPicture) {
      throw new BadRequestException('Post picture file is required.');
    }

    let post: Post;

    const user = await this.userRepository.findOneBy({
      id: postData.userId,
    });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${postData.userId}`);
    }

    try {
      post = this.postRepository.create({
        ...postData,
        user: user,
      });
      await this.postRepository.save(post);
    } catch (error) {
      throw new HttpException(
        'Failed to create post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (postPicture) {
      try {
        const fileData = await this.fileService.savePostPicture(
          postPicture,
          post.id,
        );
        await this.assetService.addPostPictureMetadataInDatabase(
          post.id,
          post.user.id,
          fileData,
        );
      } catch (error) {
        throw new HttpException(
          'Failed to upload post picture',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return post;
  }

  async updatePost(id: string, postData: UpdatePostDto): Promise<Post> {
    const existingPost = await this.getPostById(id);
    const postToUpdate = this.postRepository.merge(existingPost, postData);
    return this.postRepository.save(postToUpdate);
  }

  async removePost(id: string): Promise<Post> {
    const existingPost = await this.getPostById(id);
    await this.fileService.deletePostsPictures(id);
    await this.postRepository.remove(existingPost);
    return existingPost;
  }
}
