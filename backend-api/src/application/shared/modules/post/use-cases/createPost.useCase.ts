import { File } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetArtistByIdUseCase } from 'src/application/modules/artist/use-cases/getArtistById.useCase';
import { AssetService } from 'src/application/services/asset.service';
import { Post } from 'src/domain/entities/post.entity';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { ArtistId } from 'src/domain/value objects/artistId';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { CreatePostDto } from 'src/presentation/dto/post/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
  ) {}

  async execute(postData: CreatePostDto, postPicture: File): Promise<Post> {
    if (!postPicture) {
      throw new BadRequestException('Post picture file is required.');
    }

    let post: Post;

    const artistId = new ArtistId(postData.userId);
    const user = await this.getArtistByIdUseCase.execute(artistId);

    if (!user) {
      throw new NotFoundException(`User not found with ID: ${postData.userId}`);
    }

    try {
      post = await this.postRepository.createPost(postData, user);
    } catch (error) {
      throw new HttpException(
        'Failed to create post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (postPicture) {
      try {
        const fileData = await this.fileService.savePostPicture(
          post.id,
          postPicture,
        );
        await this.assetService.addPostPictureMetadataInDatabase(
          post.id,
          post.user.id,
          fileData,
        );
      } catch (error) {
        throw new HttpException(
          'Failed to upload post picture',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return post;
  }
}
