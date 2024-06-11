// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { File } from '@nest-lab/fastify-multer';
// import { User } from 'src/domain/entities/user.entity';
// import { FileService } from 'src/infrastructure/services/file/file.service';
// import { PostPictureService } from './post-picture.service';
// import { PostId } from 'src/domain/value objects/postId';

// @Injectable()
// export class PostPictureHandler {
//   constructor(
//     private readonly fileService: FileService,
//     private readonly postPictureService: PostPictureService,
//   ) {}

//   async handle(
//     userId: string,
//     postId: string,
//     postPicture: File,
//   ): Promise<void> {
//     if (!postPicture) return;

//     const postIdValue = new PostId(postId);

//     try {
//       const fileData = await this.fileService.savePostPicture(
//         userId,
//         postId,
//         postPicture,
//       );
//       await this.postPictureService.addPostPictureMetadataInDatabase(
//         postIdValue,
//         userId,
//         fileData,
//       );
//     } catch (error) {
//       throw new HttpException(
//         'Failed to save post picture',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
// }
