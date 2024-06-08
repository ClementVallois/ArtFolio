import { Injectable } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { PostRepository } from 'src/domain/interfaces/postRepository.interface';

@Injectable()
export class GetAllPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
