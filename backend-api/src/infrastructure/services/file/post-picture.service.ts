// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Asset } from 'src/domain/entities/asset.entity';
// import { User } from 'src/domain/entities/user.entity';
// import { IAssetRepository } from 'src/domain/interfaces/asset.repository.interface';
// import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
// import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
// import { UserId } from 'src/domain/value objects/userId';
// import { FileData } from 'src/infrastructure/common/types/file.interface';

// @Injectable()
// export class PostPictureService {
//   constructor(
//     private readonly assetRepository: IAssetRepository,
//     private readonly postRepository: IPostRepository,
//   ) {}
//   async addPostPictureMetadataInDatabase(
//     postId: string,
//     userId: string,
//     fileData: FileData,
//   ): Promise<Asset> {
//     const post = await this.postRepository.findOneBy({
//       id: postId,
//     });
//     if (!post) {
//       throw new NotFoundException(`Post not found with ID: ${postId}`);
//     }

//     const assetToCreate = this.assetRepository.create({
//       url: fileData.filePath,
//       mimetype: fileData.fileType,
//       type: 'post_picture',
//       postId: post,
//       userId: { id: userId },
//     });
//     return this.assetRepository.save(assetToCreate);
//   }
// }
