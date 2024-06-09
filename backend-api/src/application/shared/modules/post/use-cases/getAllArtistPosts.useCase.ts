import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllArtistPostsUseCase {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: AmateurId): Promise<Post[]> {
    const amateurId = id.toString();
    const user = await this.userRepository.findOneBy({ id: amateurId });
    if (!user) {
      throw new NotFoundException(`Artist not found with ID: ${id}`);
    }
    const pinnedPosts = await this.postRepository.find({
      where: { user: { id: amateurId }, isPinned: true },
      order: { createdAt: 'DESC' },
    });

    const nonPinnedPosts = await this.postRepository.find({
      where: { user: { id: amateurId }, isPinned: false },
      order: { createdAt: 'DESC' },
    });

    const artistPosts = [...pinnedPosts, ...nonPinnedPosts];

    if (!artistPosts || artistPosts.length === 0) {
      throw new NotFoundException(`Posts not found for Artist with ID: ${id}`);
    }
    return artistPosts;
  }
}
