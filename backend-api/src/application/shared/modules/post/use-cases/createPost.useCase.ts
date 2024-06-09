import { File } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetService } from 'src/application/services/asset.service';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { CreatePostDto } from 'src/presentation/dto/post/create-post.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
  ) {}

  async execute(postData: CreatePostDto, postPicture: File): Promise<Post> {
    if (!postPicture) {
      throw new BadRequestException('Post picture file is required.');
    }

    let post: Post;

    const user = await this.userRepository.findOneBy({
      id: postData.userId,
    });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${postData.userId}`);
    }

    try {
      post = this.postRepository.create({
        ...postData,
        user: user,
      });
      await this.postRepository.save(post);
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
