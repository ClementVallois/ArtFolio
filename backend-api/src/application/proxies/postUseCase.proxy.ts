import { Injectable } from '@nestjs/common';
import { GetPostByIdUseCase } from '../useCases/post/getPostById.useCase';
import { UpdatePostUseCase } from '../useCases/post/updatePost.useCase';
import { RemovePostUseCase } from '../useCases/post/removePost.useCase';
import { GetPostAssetsUseCase } from '../useCases/post/getPostAssets.useCase';

@Injectable()
export class PostUseCaseProxy {
  constructor(
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly removePostUseCase: RemovePostUseCase,
  ) {}

  getPostById = this.getPostByIdUseCase.execute.bind(this.getPostByIdUseCase);
  getPostAssets = this.getPostAssetsUseCase.execute.bind(
    this.getPostAssetsUseCase,
  );
  updatePost = this.updatePostUseCase.execute.bind(this.updatePostUseCase);
  removePost = this.removePostUseCase.execute.bind(this.removePostUseCase);
}
