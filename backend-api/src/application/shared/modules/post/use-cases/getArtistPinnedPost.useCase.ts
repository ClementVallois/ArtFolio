import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetArtistPinnedPostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(artistId: ArtistId): Promise<Post> {
    const pinnedPost =
      await this.postRepository.findPinnedPostByArtistId(artistId);

    if (!pinnedPost) {
      throw new NotFoundException(
        `Pinned post not found for artist with ID: ${artistId}`,
      );
    }

    return pinnedPost;
  }
}
