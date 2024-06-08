import { Post } from '../entities/post.entity';
import { Repository } from './repository.interface';

export interface PostRepository extends Repository<Post> {}
