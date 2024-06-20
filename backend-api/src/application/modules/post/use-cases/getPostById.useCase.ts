import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from 'src/infrastructure/logger/logger.service';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { PostId } from 'src/domain/value-objects/postId';

@Injectable()
export class GetPostByIdUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: PostId): Promise<Post> {
    this.logger.info(`Executing GetPostByIdUseCase for ID: ${id}`, 4);

    try {
      const post = await this.postRepository.findPostById(id);
      if (!post) {
        this.logger.warn(`Post not found with ID: ${id}`, 5);
        throw new NotFoundException(`Post not found with ID: ${id}`);
      }
      this.logger.debug(`Found post with ID: ${id}`, 3);
      return post;
    } catch (error) {
      this.logger.error(
        `Failed to execute GetPostByIdUseCase for ID: ${id}`,
        error,
        6,
      );
      throw error;
    }
  }
}
