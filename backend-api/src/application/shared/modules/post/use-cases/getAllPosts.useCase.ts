import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';

@Injectable()
export class GetAllPostsUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly logger: Logger,
  ) {}

  async execute(): Promise<Post[]> {
    this.logger.info('Executing GetAllPostsUseCase', 4);

    try {
      const posts = await this.postRepository.findAllPostsSortedByCreatedDate();
      this.logger.debug(`Found ${posts.length} posts`, 3);
      return posts;
    } catch (error) {
      this.logger.error('Failed to execute GetAllPostsUseCase', error, 6);
      throw error;
    }
  }
}
