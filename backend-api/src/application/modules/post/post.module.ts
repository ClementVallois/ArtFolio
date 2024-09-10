import { Module } from '@nestjs/common';
import { PostController } from 'src/presentation/controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { RemovePostUseCase } from 'src/application/modules/post/use-cases/removePost.useCase';
import { UpdatePostUseCase } from 'src/application/modules/post/use-cases/updatePost.useCase';
import { PostRepository } from 'src/infrastructure/repositories/post.repository';
import { CommonModule } from 'src/application/common/common.module';
import { SharedPostModule } from 'src/application/shared/modules/post/shared-post.module';
import { SharedFileModule } from 'src/application/handlers/shared-file.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommonModule,
    SharedPostModule,
    SharedFileModule,
  ],
  controllers: [PostController],
  providers: [
    { provide: 'IPostRepository', useClass: PostRepository },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    RemovePostUseCase,
    UpdatePostUseCase,
  ],
  exports: [RemovePostUseCase, UpdatePostUseCase],
})
export class PostModule {}
