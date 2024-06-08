import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value objects/postId';
import { Repository } from 'typeorm';

@Injectable()
export class GetPostByIdUseCase {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async execute(id: PostId): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: id.toString() },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Post not found with ID: ${id}`);
    }
    return post;
  }
}
