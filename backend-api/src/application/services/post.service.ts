import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../presentation/dto/post/create-post.dto';
import { UpdatePostDto } from '../../presentation/dto/post/update-post.dto';
import { Post } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { File } from '@nest-lab/fastify-multer';
import { PostId } from 'src/domain/value objects/postId';
import { PostUseCaseProxy } from '../proxies/postUseCase.proxy';

@Injectable()
export class PostService {
  constructor(private readonly postUseCaseProxy: PostUseCaseProxy) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postUseCaseProxy.getAllPosts();
  }

  async getPostById(postId: PostId): Promise<Post> {
    return this.postUseCaseProxy.getPostById(postId);
  }

  async getArtistPinnedPost(artistId: string): Promise<Post> {
    return this.postUseCaseProxy.getArtistPinnedPost(artistId);
  }

  async getPostAssets(postId: PostId): Promise<Asset[]> {
    return this.postUseCaseProxy.getPostAssets(postId);
  }

  async getOneArtistPost(userId: string, postId: string): Promise<Post> {
    return this.postUseCaseProxy.getOneArtistPost(userId, postId);
  }

  async getAllArtistPosts(artistId: string): Promise<Post[]> {
    return this.postUseCaseProxy.getAllArtistPosts(artistId);
  }

  async createPost(postData: CreatePostDto, postPicture: File): Promise<Post> {
    return this.postUseCaseProxy.createPost(postData, postPicture);
  }

  async updatePost(postId: PostId, postData: UpdatePostDto): Promise<Post> {
    return this.postUseCaseProxy.updatePost(postId, postData);
  }

  async removePost(postId: PostId): Promise<Post> {
    return this.postUseCaseProxy.removePost(postId);
  }
}
