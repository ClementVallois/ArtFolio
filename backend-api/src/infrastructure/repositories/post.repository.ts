import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value objects/postId';
import { UpdatePostDto } from 'src/presentation/dto/post/update-post.dto';
import { ArtistId } from 'src/domain/value objects/artistId';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { User } from 'src/domain/entities/user.entity';
import { CreatePostDto } from 'src/presentation/dto/post/create-post.dto';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findPostById(id: PostId): Promise<Post> {
    return this.postRepository.findOne({
      where: { id: id.toString() },
      relations: ['user'],
    });
  }

  findOnePostByPostIdAndArtistId(
    artistId: ArtistId,
    postId: PostId,
  ): Promise<Post> {
    return this.postRepository.findOne({
      where: {
        user: { id: artistId.toString() },
        id: postId.toString(),
      },
    });
  }

  findPinnedPostByArtistId(artistId: ArtistId): Promise<Post> {
    return this.postRepository.findOne({
      where: { user: { id: artistId.toString() }, isPinned: true },
      order: { createdAt: 'DESC' },
    });
  }

  findUnpinnedPostsByArtistId(artistId: ArtistId): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: artistId.toString() }, isPinned: false },
      order: { createdAt: 'DESC' },
    });
  }
  findAllPostsByDescCreatedDate(): Promise<Post[]> {
    return this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  updatePost(existingPost: Post, postData: UpdatePostDto): Promise<Post> {
    const postToUpdate = this.postRepository.merge(existingPost, postData);
    return this.postRepository.save(postToUpdate);
  }

  createPost(postData: CreatePostDto, artist: User): Promise<Post> {
    const postToCreate = this.postRepository.create({
      ...postData,
      user: artist,
    });
    return this.postRepository.save(postToCreate);
  }

  remove(post: Post): Promise<Post> {
    return this.postRepository.remove(post);
  }
}
