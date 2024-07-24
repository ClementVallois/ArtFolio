import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GetAllPostsUseCase {
  private readonly CACHE_KEY = 'all_posts';
  private readonly CACHE_TTL = 10000;

  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly logger: Logger,
  ) {}

  /**
   * Retrieves all posts from repository, either from cache or from database.
   * @return {Promise<Post[]>} Promise with all posts.
   * @throws {Error} If retrieving posts from repository fails.
   */
  @LogMethod(LogLevel.DEBUG)
  async execute(): Promise<Post[]> {
    try {
      const cachedPosts = await this.cacheManager.get<Post[]>(this.CACHE_KEY);
      if (cachedPosts) {
        this.logger.debug(`Retrieved ${cachedPosts.length} posts from cache`);
        return cachedPosts;
      }

      const posts = await this.postRepository.findAllPostsSortedByCreatedDate();
      this.logger.debug(`Found ${posts.length} posts from database`);

      await this.cacheManager.set(this.CACHE_KEY, posts, this.CACHE_TTL);

      return posts;
    } catch (error) {
      this.logger.error('Failed to execute GetAllPostsUseCase', error);
      throw error;
    }
  }
}
