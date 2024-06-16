import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { PostId } from 'src/domain/value-objects/postId';

@Injectable()
export class GetOneArtistPostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(artistId: ArtistId, postId: PostId): Promise<Post> {
    const artistPost = await this.postRepository.findPostIdAndArtistId(
      artistId,
      postId,
    );
    if (!artistPost) {
      throw new NotFoundException(
        `Post not found for Artist with ID: ${artistId} and Post ID: ${postId}`,
      );
    }
    return artistPost;
  }
}
