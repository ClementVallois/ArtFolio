import { Injectable } from '@nestjs/common';
import { GetAllPostsUseCase } from '../useCases/post/getAllPosts.useCase';
import { GetPostByIdUseCase } from '../useCases/post/getPostById.useCase';
import { GetArtistPinnedPostUseCase } from '../useCases/post/getArtistPinnedPost.useCase';
import { GetOneArtistPostUseCase } from '../useCases/post/getOneArtistPost.useCase';
import { GetAllArtistPostsUseCase } from '../useCases/post/getAllArtistPosts.useCase';
import { CreatePostUseCase } from '../useCases/post/createPost.useCase';
import { UpdatePostUseCase } from '../useCases/post/updatePost.useCase';
import { RemovePostUseCase } from '../useCases/post/removePost.useCase';
import { GetPostAssetsUseCase } from '../useCases/post/getPostAssets.useCase';

@Injectable()
export class PostUseCaseProxy {
  constructor(
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly getPostAssetsUseCase: GetPostAssetsUseCase,
    private readonly getOneArtistPostUseCase: GetOneArtistPostUseCase,
    private readonly getAllArtistPostsUseCase: GetAllArtistPostsUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly removePostUseCase: RemovePostUseCase,
  ) {}

  getAllPosts = this.getAllPostsUseCase.execute.bind(this.getAllPostsUseCase);
  getPostById = this.getPostByIdUseCase.execute.bind(this.getPostByIdUseCase);
  getArtistPinnedPost = this.getAllPostsUseCase.execute.bind(
    this.getArtistPinnedPostUseCase,
  );
  getPostAssets = this.getAllPostsUseCase.execute.bind(
    this.getPostAssetsUseCase,
  );
  getOneArtistPost = this.getAllPostsUseCase.execute.bind(
    this.getOneArtistPostUseCase,
  );
  getAllArtistPosts = this.getAllPostsUseCase.execute.bind(
    this.getAllArtistPostsUseCase,
  );
  createPost = this.getAllPostsUseCase.execute.bind(this.createPostUseCase);
  updatePost = this.getAllPostsUseCase.execute.bind(this.updatePostUseCase);
  removePost = this.getAllPostsUseCase.execute.bind(this.removePostUseCase);
}
