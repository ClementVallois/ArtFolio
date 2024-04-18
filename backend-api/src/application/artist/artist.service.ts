import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/infrastructure/entities/post.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { CreateArtistDto } from 'src/presentation/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/presentation/artist/dto/update-artist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAllArtists(): Promise<User[]> {
    try {
      return await this.userRepository.find({ where: { role: 'artist' } });
    } catch (error) {
      throw new HttpException(
        'Error getting artists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getArtistById(id: string): Promise<User> {
    if (!id) {
      throw new HttpException('Artist ID is required', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.userRepository.findOne({
      where: { id: id, role: 'artist' },
    });
    if (!artist) {
      throw new NotFoundException(`Artist not found with ID: ${id}`);
    }
    return artist;
  }

  async getArtistPosts(id: string): Promise<Post[]> {
    const artistPosts = await this.postRepository.find({
      where: { user: { id: id } },
    });
    if (!artistPosts) {
      throw new NotFoundException(`Posts not found for Artist with ID: ${id}`);
    }
    return artistPosts;
  }

  async getOneArtistPost(userId: string, postId: string): Promise<Post> {
    const artistPost = await this.postRepository.findOne({
      where: { user: { id: userId }, id: postId },
    });
    if (!artistPost) {
      throw new NotFoundException(
        `Post not found for Artist with ID: ${userId} and Post ID: ${postId}`,
      );
    }
    return artistPost;
  }

  async createArtist(artistData: CreateArtistDto): Promise<User> {
    if (artistData.role !== 'artist') {
      throw new HttpException('Role must be artist', HttpStatus.BAD_REQUEST);
    }
    try {
      const artistToCreate = this.userRepository.create(artistData);
      return await this.userRepository.save(artistToCreate);
    } catch (error) {
      // TODO: Create a validation service to use instead of manual check
      if (error.code === '23505') {
        let errorMessage: string;
        if (error.detail.includes('username')) {
          errorMessage = `Artist with username ${artistData.username} already exists`;
        } else if (error.detail.includes('auth0_id')) {
          errorMessage = `Artist with Auth0 ID ${artistData.auth0Id} already exists`;
        } else {
          errorMessage = 'Error creating artist';
        }
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Error creating artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateArtist(id: string, artist: UpdateArtistDto): Promise<User> {
    const existingArtist = await this.getArtistById(id);
    this.userRepository.merge(existingArtist, artist);
    return this.userRepository.save(existingArtist);
  }

  async removeArtist(id: string): Promise<User> {
    const existingArtist = await this.getArtistById(id);
    return this.userRepository.remove(existingArtist);
  }
}
