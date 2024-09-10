import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetArtistByIdUseCase } from 'src/application/shared/modules/artist/use-cases/getArtistById.useCase';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetAllArtistPostsUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(id: ArtistId): Promise<Post[]> {
    const user = await this.getArtistByIdUseCase.execute(id);
    if (!user) {
      throw new NotFoundException(`Artist not found with ID: ${id}`);
    }
    const pinnedPost = await this.postRepository.findPinnedPostByArtistId(id);
    const pinnedPostArray = pinnedPost ? [pinnedPost] : [];
    const nonPinnedPosts =
      await this.postRepository.findUnpinnedPostsByArtistId(id);

    const artistPosts = [...pinnedPostArray, ...nonPinnedPosts];

    if (!artistPosts || artistPosts.length === 0) {
      throw new NotFoundException(`Posts not found for Artist with ID: ${id}`);
    }
    return artistPosts;
  }
}
