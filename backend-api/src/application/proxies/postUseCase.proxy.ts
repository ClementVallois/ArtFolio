import { Injectable } from '@nestjs/common';
import { GetAllPostsUseCase } from '../useCases/post/getAllPosts.useCase';

@Injectable()
export class PostUseCaseProxy {
  constructor(private readonly getAllPostsUseCase: GetAllPostsUseCase) {}

  getAllPosts = this.getAllPostsUseCase.execute.bind(this.getAllPostsUseCase);
}
