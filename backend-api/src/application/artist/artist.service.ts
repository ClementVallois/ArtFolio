import { File } from '@nest-lab/fastify-multer';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { Category } from 'src/infrastructure/entities/category.entity';
import { Post } from 'src/infrastructure/entities/post.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { CreateArtistDto } from 'src/presentation/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/presentation/artist/dto/update-artist.dto';
import { Repository } from 'typeorm';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private fileService: FileService,
    private assetService: AssetService,
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
      where: { user: { id: id }, isPinned: true },
      order: { createdAt: 'DESC' },
    });

    const nonPinnedPosts = await this.postRepository.find({
      where: { user: { id: id }, isPinned: false },
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
      where: { user: { id: userId }, id: postId },
    });
    if (!artistPost) {
      throw new NotFoundException(
        `Post not found for Artist with ID: ${userId} and Post ID: ${postId}`,
      );
    }
    return artistPost;
  }

  async getArtistCategories(userId: string): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: { user: { id: userId } },
    });
    if (!categories || categories.length === 0) {
      throw new NotFoundException(
        `Categories not found for User with ID: ${userId}`,
      );
    }
    return categories;
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
        where: { user: artist, isPinned: true },
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
        where: { user: randomArtist, isPinned: true },
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

  async createArtist(artistData: CreateArtistDto, file: File): Promise<User> {
    let artist: User;
    try {
      artist = this.userRepository.create(artistData);
      await this.userRepository.save(artist);
    } catch (error) {
      // TODO : Add a better error handling
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
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (file) {
      try {
        const filePath = await this.fileService.saveProfilePicture(
          file,
          artist.id,
        );
        await this.assetService.addProfilePicture(artist.id, filePath);
      } catch (error) {
        throw new HttpException(
          'Failed to save profile picture',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return artist;
  }

  async updateArtist(id: string, artist: UpdateArtistDto): Promise<User> {
    const existingArtist = await this.getArtistById(id);
    this.userRepository.merge(existingArtist, artist);
    return this.userRepository.save(existingArtist);
  }

  async removeArtist(id: string): Promise<User> {
    const existingArtist = await this.getArtistById(id);

    try {
      await this.fileService.deleteProfilePicture(id);
    } catch (error) {
      throw new HttpException(
        "Failed to remove the artist's profile picture",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      return await this.userRepository.remove(existingArtist);
    } catch (error) {
      console.error(`Failed to remove artist from database: ${error}`);
      throw new HttpException(
        'Failed to remove artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
