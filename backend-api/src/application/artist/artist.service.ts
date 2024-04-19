import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
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
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async getAllArtists(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { role: 'artist' },
        order: { createdAt: 'DESC' },
      });
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
    const pinnedPosts = await this.postRepository.find({
      where: { userId: { id: id }, isPinned: true },
      order: { createdAt: 'DESC' },
    });

    const nonPinnedPosts = await this.postRepository.find({
      where: { userId: { id: id }, isPinned: false },
      order: { createdAt: 'DESC' },
    });

    const artistPosts = [...pinnedPosts, ...nonPinnedPosts];

    if (!artistPosts || artistPosts.length === 0) {
      throw new NotFoundException(`Posts not found for Artist with ID: ${id}`);
    }
    return artistPosts;
  }

  async getOneArtistPost(userId: string, postId: string): Promise<Post> {
    const artistPost = await this.postRepository.findOne({
      where: { userId: { id: userId }, id: postId },
    });
    if (!artistPost) {
      throw new NotFoundException(
        `Post not found for Artist with ID: ${userId} and Post ID: ${postId}`,
      );
    }
    return artistPost;
  }

  async getLastRegisteredArtistsPosts(numberOfPosts: number): Promise<
    {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    const lastRegisteredArtists = await this.userRepository.find({
      where: { role: 'artist' },
      order: { createdAt: 'DESC' },
      take: numberOfPosts,
    });

    if (lastRegisteredArtists.length < numberOfPosts) {
      throw new NotFoundException(
        `Expected ${numberOfPosts} artists, but found ${lastRegisteredArtists.length}`,
      );
    }

    const artistWithPostsList: {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[] = [];

    for (const artist of lastRegisteredArtists) {
      const pinnedPost = await this.postRepository.findOne({
        where: { userId: artist, isPinned: true },
        order: { createdAt: 'DESC' },
      });

      if (!pinnedPost) {
        throw new NotFoundException(
          `Pinned post not found for artist with ID: ${artist.id}`,
        );
      }

      const postAssets = await this.assetRepository.find({
        where: { postId: { id: pinnedPost.id } },
      });

      const artistAsset = await this.assetRepository.findOne({
        where: { type: 'profile_picture', userId: artist },
      });

      artistWithPostsList.push({
        artist,
        pinnedPost,
        postAssets: postAssets,
        artistAsset: artistAsset,
      });
    }

    return artistWithPostsList;
  }

  async getRandomArtistsPost(numberOfArtists: number): Promise<
    {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    const randomArtists = await this.userRepository.find({
      where: { role: 'artist' },
    });

    const artistsInDB = randomArtists.length;
    const selectedArtists: {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[] = [];

    for (let i = 0; i < numberOfArtists; i++) {
      const randomIndex = Math.floor(Math.random() * artistsInDB);
      const randomArtist = randomArtists[randomIndex];

      const pinnedPost = await this.postRepository.findOne({
        where: { userId: randomArtist, isPinned: true },
      });

      if (!pinnedPost) {
        throw new NotFoundException(
          `Pinned post not found for artist with ID: ${randomArtist.id}`,
        );
      }

      const postAssets = await this.assetRepository.find({
        where: { postId: { id: pinnedPost.id } },
      });

      const artistAsset = await this.assetRepository.findOne({
        where: { type: 'profile_picture', userId: randomArtist },
      });

      selectedArtists.push({
        artist: randomArtist,
        pinnedPost: pinnedPost,
        postAssets: postAssets,
        artistAsset: artistAsset,
      });
    }

    return selectedArtists;
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
