import { Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { PostPictureService } from 'src/infrastructure/services/file/post-picture.service';
import { PostId } from 'src/domain/value-objects/postId';
import { ArtistId } from 'src/domain/value-objects/artistId';

@Injectable()
export class PostPictureHandler {
  constructor(private readonly postPictureService: PostPictureService) {}

  async createPostPicture(
    artistId: ArtistId,
    postId: string,
    postPicture: File,
  ): Promise<void> {
    if (!postPicture) return;

    const postIdValue = new PostId(postId);

    const fileData = await this.postPictureService.savePostPicture(
      postId,
      postPicture,
    );
    await this.postPictureService.addPostPictureMetadata(
      postIdValue,
      artistId,
      fileData,
    );
  }

  async deletePostPicture(postId: PostId): Promise<void> {
    await this.postPictureService.deletePostsPictures(postId);
    // Not needed because delete is done on cascade from post
    // await this.postPictureService.removePostPictureMetadata(postId);
  }

  async deleteArtistPostsPictures(artistId: ArtistId): Promise<void> {
    await this.postPictureService.deleteArtistPostsPictures(artistId);
  }
}
