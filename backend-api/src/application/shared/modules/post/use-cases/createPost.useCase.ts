import { File } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';
import { GetArtistByIdUseCase } from 'src/application/modules/artist/use-cases/getArtistById.useCase';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { CreatePostDto } from 'src/presentation/dto/post/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly postPictureHandler: PostPictureHandler,
  ) {}

  async execute(postData: CreatePostDto, postPicture: File): Promise<Post> {
    if (!postPicture) {
      throw new BadRequestException('Post picture file is required.');
    }

    let post: Post;

    const artistId = new ArtistId(postData.artistId);
    const user = await this.getArtistByIdUseCase.execute(artistId);

    try {
      post = await this.postRepository.createPost(postData, user);
    } catch (error) {
      throw new HttpException(
        'Failed to create post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.postPictureHandler.createPostPicture(
      artistId,
      post.id,
      postPicture,
    );
    return post;
  }
}
