import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { ArtistId } from 'src/domain/value objects/artistId';
import { Repository } from 'typeorm';

@Injectable()
export class GetArtistPinnedPostUseCase {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async execute(artistId: ArtistId): Promise<Post> {
    const pinnedPost = await this.postRepository.findOne({
      where: { user: { id: artistId.toString() }, isPinned: true },
    });

    if (!pinnedPost) {
      throw new NotFoundException(
        `Pinned post not found for artist with ID: ${artistId}`,
      );
    }

    return pinnedPost;
  }
}
