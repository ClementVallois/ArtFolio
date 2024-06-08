import { Module } from '@nestjs/common';
import { PostUseCaseProxy } from 'src/application/proxies/postUseCase.proxy';
import { CreatePostUseCase } from 'src/application/useCases/post/createPost.useCase';
import { GetAllArtistPostsUseCase } from 'src/application/useCases/post/getAllArtistPosts.useCase';
import { GetAllPostsUseCase } from 'src/application/useCases/post/getAllPosts.useCase';
import { GetArtistPinnedPostUseCase } from 'src/application/useCases/post/getArtistPinnedPost.useCase';
import { GetOneArtistPostUseCase } from 'src/application/useCases/post/getOneArtistPost.useCase';
import { GetPostAssetsUseCase } from 'src/application/useCases/post/getPostAssets.useCase';
import { GetPostByIdUseCase } from 'src/application/useCases/post/getPostById.useCase';
import { RemovePostUseCase } from 'src/application/useCases/post/removePost.useCase';
import { UpdatePostUseCase } from 'src/application/useCases/post/updatePost.useCase';

@Module({
  providers: [
    PostUseCaseProxy,
    GetAllPostsUseCase,
    GetPostByIdUseCase,
    GetArtistPinnedPostUseCase,
    GetOneArtistPostUseCase,
    GetAllArtistPostsUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
    RemovePostUseCase,
    GetPostAssetsUseCase,
  ],
  exports: [PostUseCaseProxy],
})
export class PostUseCaseProxyModule {}
