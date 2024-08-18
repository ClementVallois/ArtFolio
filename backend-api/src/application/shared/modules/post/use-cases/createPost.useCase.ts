import { File } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { PostPictureHandler } from 'src/application/handlers/post-picture.handler';
import { GetArtistByIdUseCase } from 'src/application/shared/modules/artist/use-cases/getArtistById.useCase';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { CreatePostDto } from 'src/presentation/dto/post/create-post.dto';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly postPictureHandler: PostPictureHandler,
    private readonly logger: Logger,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(postData: CreatePostDto, postPicture: File): Promise<Post> {
    this.logger.info(
      `Executing CreatePostUseCase for artistId: ${postData.artistId}`,
      4,
    );

    if (!postPicture) {
      this.logger.warn('Post picture file is required.', 5);
      throw new BadRequestException('Post picture file is required.');
    }

    let post: Post;

    const artistId = new ArtistId(postData.artistId);
    const user = await this.getArtistByIdUseCase.execute(artistId);

    try {
      post = await this.postRepository.createPost(postData, user);
      this.logger.debug(`Created post with id: ${post.id}`, 3);
    } catch (error) {
      this.logger.error('Failed to create post', error, 6);
      throw new HttpException(
        'Failed to create post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      await this.postPictureHandler.createPostPicture(
        artistId,
        post.id,
        postPicture,
      );
      this.logger.debug(`Post picture created for postId: ${post.id}`, 3);
    } catch (error) {
      this.logger.error(
        `Failed to create post picture for postId: ${post.id}`,
        error,
        6,
      );
      throw error;
    }

    return post;
  }
}
