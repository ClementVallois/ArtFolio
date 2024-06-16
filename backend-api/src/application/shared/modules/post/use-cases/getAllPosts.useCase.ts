import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';

@Injectable()
export class GetAllPostsUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(): Promise<Post[]> {
    return await this.postRepository.findAllPostsSortedByCreatedDate();
  }
}
