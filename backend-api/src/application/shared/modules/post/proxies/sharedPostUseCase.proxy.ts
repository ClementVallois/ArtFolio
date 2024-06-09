import { Injectable } from '@nestjs/common';
import { GetAllPostsUseCase } from '../use-cases/getAllPosts.useCase';
import { GetArtistPinnedPostUseCase } from '../use-cases/getArtistPinnedPost.useCase';
import { GetOneArtistPostUseCase } from '../use-cases/getOneArtistPost.useCase';
import { CreatePostUseCase } from '../use-cases/createPost.useCase';
import { GetAllArtistPostsUseCase } from '../use-cases/getAllArtistPosts.useCase';

@Injectable()
export class SharedPostUseCaseProxy {
  constructor(
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getArtistPinnedPostUseCase: GetArtistPinnedPostUseCase,
    private readonly getAllArtistPostsUseCase: GetAllArtistPostsUseCase,
    private readonly getOneArtistPostUseCase: GetOneArtistPostUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
  ) {}

  getAllPosts = this.getAllPostsUseCase.execute.bind(this.getAllPostsUseCase);
  getArtistPinnedPost = this.getArtistPinnedPostUseCase.execute.bind(
    this.getArtistPinnedPostUseCase,
  );

  getAllArtistPosts = this.getAllArtistPostsUseCase.execute.bind(
    this.getAllArtistPostsUseCase,
  );

  getOneArtistPost = this.getOneArtistPostUseCase.execute.bind(
    this.getOneArtistPostUseCase,
  );

  createPost = this.createPostUseCase.execute.bind(this.createPostUseCase);
}
