import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value objects/postId';
import { UpdatePostDto } from 'src/presentation/dto/post/update-post.dto';
import { Repository } from 'typeorm';
import { PostUseCaseProxy } from 'src/application/proxies/postUseCase.proxy';
import { PostService } from 'src/application/services/post.service';

@Injectable()
export class UpdatePostUseCase {
  constructor(
    private readonly postService: PostService,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async execute(id: PostId, postData: UpdatePostDto): Promise<Post> {
    const existingPost = await this.postService.getPostById(id);
    const postToUpdate = this.postRepository.merge(existingPost, postData);
    return this.postRepository.save(postToUpdate);
  }
}
