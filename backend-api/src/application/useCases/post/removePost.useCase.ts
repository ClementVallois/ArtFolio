import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value objects/postId';
import { Repository } from 'typeorm';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { PostUseCaseProxy } from 'src/application/proxies/postUseCase.proxy';

@Injectable()
export class RemovePostUseCase {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly postUseCaseProxy: PostUseCaseProxy,
    private readonly fileService: FileService,
  ) {}

  async execute(id: PostId): Promise<Post> {
    const existingPost = await this.postUseCaseProxy.getPostById.execute(id);
    await this.fileService.deletePostsPictures(id);
    await this.postRepository.remove(existingPost);
    return existingPost;
  }
}
