import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { PostId } from 'src/domain/value objects/postId';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneArtistPostUseCase {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async execute(userId: AmateurId, postId: PostId): Promise<Post> {
    const artistPost = await this.postRepository.findOne({
      where: { user: { id: userId.toString() }, id: postId.toString() },
    });
    if (!artistPost) {
      throw new NotFoundException(
        `Post not found for Artist with ID: ${userId} and Post ID: ${postId}`,
      );
    }
    return artistPost;
  }
}
