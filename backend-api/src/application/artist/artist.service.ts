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
import { PostService } from '../post/post.service';
import { CategoryService } from '../category/category.service';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { ValidationService } from 'src/presentation/utils/validators/validation.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly errorService: ErrorService,
    private readonly validationService: ValidationService,
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

  async getOneArtistPost(userId: string, postId: string): Promise<Post> {
    return await this.postService.getOneArtistPost(userId, postId);
  }

  async getArtistPosts(id: string): Promise<Post[]> {
    return await this.postService.getArtistPosts(id);
  }

  async getArtistCategories(userId: string): Promise<Category[]> {
    return await this.categoryService.getArtistCategories(userId);
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
      const pinnedPost = await this.postService.getArtistPinnedPost(artist.id);
      const postAssets = await this.assetService.getPostAssets(pinnedPost.id);
      const artistAsset = await this.assetService.getArtistProfilePicture(
        artist.id,
      );

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

      const pinnedPost = await this.postService.getArtistPinnedPost(
        randomArtist.id,
      );
      const postAssets = await this.assetService.getPostAssets(pinnedPost.id);

      const artistAsset = await this.assetService.getArtistProfilePicture(
        randomArtist.id,
      );

      selectedArtists.push({
        artist: randomArtist,
        pinnedPost: pinnedPost,
        postAssets: postAssets,
        artistAsset: artistAsset,
      });
    }

    return selectedArtists;
  }

  async handleCreateArtist(
    artistData: CreateArtistDto,
    files: { profilePicture?: File; postPicture?: File[] },
  ): Promise<User> {
    this.validationService.validateFilesAndData(files, artistData);
    const profilePicture = files.profilePicture[0];
    const postPicture = files.postPicture[0];

    const artist = await this.createArtist(artistData, profilePicture);
    await this.postService.createPost(
      {
        isPinned: artistData.post.isPinned,
        description: artistData.post.description,
        userId: artist.id,
      },
      postPicture,
    );

    await this.categoryService.assignCategoriesToArtist(
      artist.id,
      artistData.category.categories,
    );
    return artist;
  }

  async createArtist(
    artistData: CreateArtistDto,
    profilePicture: File,
  ): Promise<User> {
    let artist: User;
    try {
      artist = this.userRepository.create(artistData);
      await this.userRepository.save(artist);
    } catch (error) {
      this.handleDatabaseErrors(error, artistData);
    }

    await this.handleProfilePicture(artist, profilePicture);
    return artist;
  }

  private handleDatabaseErrors(error: any, artistData: CreateArtistDto) {
    const errorMessage = this.errorService.parseDatabaseError(
      error,
      artistData,
    );
    throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  }

  private async handleProfilePicture(artist: User, profilePicture: File) {
    try {
      const fileData = await this.fileService.saveProfilePicture(
        artist.id,
        profilePicture,
      );
      await this.assetService.addProfilePictureMetadataInDatabase(
        artist.id,
        fileData,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to save profile picture',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async handleUpdateArtist(
    artistId: string,
    artistData: UpdateArtistDto,
    files: { profilePicture?: File },
  ): Promise<User> {
    const artist = await this.updateArtist(
      artistId,
      artistData,
      files as { profilePicture?: File },
    );

    return artist;
  }

  async updateArtist(
    id: string,
    artistData: UpdateArtistDto,
    files: { profilePicture?: File },
  ): Promise<User> {
    const artist = await this.getArtistById(id);

    this.userRepository.merge(artist, artistData);
    const updatedArtist = await this.userRepository.save(artist);

    if (files.profilePicture) {
      try {
        await this.fileService.deleteProfilePicture(artist.id);
      } catch (error) {
        throw new HttpException(
          "Failed to remove the artist's profile picture",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      try {
        console.log('Profile Picture Artist Service', files.profilePicture);

        const profilePictureData = await this.fileService.saveProfilePicture(
          artist.id,
          files.profilePicture,
        );
        await this.assetService.updateProfilePictureMetadata(
          artist.id,
          profilePictureData,
        );
      } catch (error) {
        throw new HttpException(
          'Failed to save profile picture',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return updatedArtist;
  }

  async removeArtist(id: string): Promise<User> {
    const artist = await this.getArtistById(id);

    try {
      await this.fileService.deleteProfilePicture(id);
      await this.fileService.deleteUserPostsPictures(id);
    } catch (error) {
      throw new HttpException(
        "Failed to remove the artist's profile picture",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      return await this.userRepository.remove(artist);
    } catch (error) {
      console.error(`Failed to remove artist from database: ${error}`);
      throw new HttpException(
        'Failed to remove artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
