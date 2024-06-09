import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value objects/postId';
import { UpdatePostDto } from 'src/presentation/dto/post/update-post.dto';
import { Repository } from 'typeorm';
import { GetPostByIdUseCase } from './getPostById.useCase';

@Injectable()
export class UpdatePostUseCase {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
  ) {}

  async execute(id: PostId, postData: UpdatePostDto): Promise<Post> {
    const existingPost = await this.getPostByIdUseCase.execute(id);
    const postToUpdate = this.postRepository.merge(existingPost, postData);
    return this.postRepository.save(postToUpdate);
  }
}
