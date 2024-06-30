import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value-objects/postId';
import { UpdatePostDto } from 'src/presentation/dto/post/update-post.dto';
import { GetPostByIdUseCase } from './getPostById.useCase';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class UpdatePostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(id: PostId, postData: UpdatePostDto): Promise<Post> {
    const existingPost = await this.getPostByIdUseCase.execute(id);
    return this.postRepository.updatePost(existingPost, postData);
  }
}
