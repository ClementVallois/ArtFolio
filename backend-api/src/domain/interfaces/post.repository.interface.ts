import { UpdatePostDto } from 'src/presentation/dto/post/update-post.dto';
import { Post } from '../entities/post.entity';
import { PostId } from '../value objects/postId';
import { ArtistId } from '../value objects/artistId';
import { User } from '../entities/user.entity';
import { CreatePostDto } from 'src/presentation/dto/post/create-post.dto';

export interface IPostRepository {
  findPostById(id: PostId): Promise<Post>;
  findOnePostByPostIdAndArtistId(
    artistId: ArtistId,
    postId: PostId,
  ): Promise<Post>;
  findPinnedPostByArtistId(artistId: ArtistId): Promise<Post>;
  findUnpinnedPostsByArtistId(artistId: ArtistId): Promise<Post[]>;
  findAllPostsByDescCreatedDate(): Promise<Post[]>;
  updatePost(existingPost: Post, postData: UpdatePostDto): Promise<Post>;
  createPost(postData: CreatePostDto, artist: User): Promise<Post>;
  remove(post: Post): Promise<Post>;
}
