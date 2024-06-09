import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllPostsUseCase {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async execute(): Promise<Post[]> {
    return await this.postRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
