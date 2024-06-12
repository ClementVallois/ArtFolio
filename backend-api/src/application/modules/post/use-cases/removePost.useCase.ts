import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value-objects/postId';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { GetPostByIdUseCase } from './getPostById.useCase';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';

@Injectable()
export class RemovePostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly fileService: FileService,
  ) {}

  async execute(id: PostId): Promise<Post> {
    const existingPost = await this.getPostByIdUseCase.execute(id);
    await this.fileService.deletePostsPictures(id);
    await this.postRepository.remove(existingPost);
    return existingPost;
  }
}
