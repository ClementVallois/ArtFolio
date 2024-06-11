// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Post } from 'src/domain/entities/post.entity';
// import { PostRepository } from 'src/domain/interfaces/postRepository.interface';

// @Injectable()
// export class TypeOrmPostRepository implements PostRepository {
//   constructor(
//     @InjectRepository(Post)
//     private readonly postRepository: Repository<Post>,
//   ) {}

//   find(options?: any): Promise<Post[]> {
//     return this.postRepository.find(options);
//   }

//   findOne(options?: any): Promise<Post> {
//     return this.postRepository.findOne(options);
//   }

//   create(data: any): Post {
//     return this.postRepository.create(data);
//   }

//   save(post: Post): Promise<Post> {
//     return this.postRepository.save(post);
//   }

//   remove(post: Post): Promise<void> {
//     return this.postRepository.remove(post);
//   }
// }
