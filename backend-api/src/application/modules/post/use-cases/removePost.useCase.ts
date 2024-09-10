import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value-objects/postId';
import { GetPostByIdUseCase } from './getPostById.useCase';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class RemovePostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly postPictureHandler: PostPictureHandler,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(id: PostId): Promise<Post> {
    const existingPost = await this.getPostByIdUseCase.execute(id);
    await this.postPictureHandler.deletePostPicture(id);
    await this.postRepository.deletePost(existingPost);
    return existingPost;
  }
}
