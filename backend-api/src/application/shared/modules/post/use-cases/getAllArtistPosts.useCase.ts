import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetArtistByIdUseCase } from 'src/application/modules/artist/use-cases/getArtistById.useCase';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { ArtistId } from 'src/domain/value objects/artistId';

@Injectable()
export class GetAllArtistPostsUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
  ) {}

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
