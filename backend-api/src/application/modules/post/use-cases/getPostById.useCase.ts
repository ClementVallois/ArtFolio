import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { PostId } from 'src/domain/value-objects/postId';

@Injectable()
export class GetPostByIdUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(id: PostId): Promise<Post> {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new NotFoundException(`Post not found with ID: ${id}`);
    }
    return post;
  }
}
