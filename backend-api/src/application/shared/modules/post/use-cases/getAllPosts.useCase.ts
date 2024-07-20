import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetAllPostsUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<Post[]> {
    try {
      const posts = await this.postRepository.findAllPostsSortedByCreatedDate();
      this.logger.debug(`Found ${posts.length} posts`);
      return posts;
    } catch (error) {
      this.logger.error('Failed to execute GetAllPostsUseCase', error);
      throw error;
    }
  }
}
