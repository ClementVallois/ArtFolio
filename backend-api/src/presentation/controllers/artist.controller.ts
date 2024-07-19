import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateArtistDto } from '../dto/artist/create-artist.dto';
import { UpdateArtistDto } from '../dto/artist/update-artist.dto';
import {
  FindArtistPostParams,
  FindIdParams,
  FindNumberParams,
} from '../utils/params.dto';
import { AuthGuard } from '@nestjs/passport';
import { File } from '@nest-lab/fastify-multer';
import LocalFilesInterceptor from 'src/infrastructure/common/interceptors/files.interceptor';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { PostId } from 'src/domain/value-objects/postId';
import { Permissions } from '../decorators/permissions/permissions.decorator';
import { PermissionsGuard } from '../decorators/permissions/permissions.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { GetAllArtistPostsUseCase } from 'src/application/shared/modules/post/use-cases/getAllArtistPosts.useCase';
import { GetArtistCategoriesUseCase } from 'src/application/shared/modules/category/use-cases/getArtistCategories.useCase';
import { GetOneArtistPostUseCase } from 'src/application/shared/modules/post/use-cases/getOneArtistPost.useCase';
import { GetLastRegisteredArtistsPostsUseCase } from 'src/application/modules/artist/use-cases/getLastRegisteredArtistsPosts.useCase';
import { CreateArtistUseCase } from 'src/application/modules/artist/use-cases/createArtist.useCase';
import { UpdateArtistUseCase } from 'src/application/modules/artist/use-cases/updateArtist.useCase';
import { RemoveArtistUseCase } from 'src/application/modules/artist/use-cases/removeArtist.useCase';
import { GetAllArtistsUseCase } from 'src/application/modules/artist/use-cases/getAllArtists.useCase';
import { GetArtistByIdUseCase } from 'src/application/shared/modules/artist/use-cases/getArtistById.useCase';
import { User as Artist } from 'src/domain/entities/user.entity';
import { Post as PostEntity } from 'src/domain/entities/post.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { GetRandomArtistsPostUseCase } from 'src/application/modules/artist/use-cases/getRandomArtistsPost.useCase';
import { Category } from 'src/domain/entities/category.entity';
import { FileUploadDto } from '../dto/artist/fileUpload.dto';
import { GetAllArtistsWithPinnedPostUseCase } from 'src/application/modules/artist/use-cases/getAllArtistsWithPinnedPost.useCase';
import { GetUser } from '../decorators/permissions/getUser.decorator';

@ApiTags('Artists')
@Controller(['artists'])
export class ArtistController {
  constructor(
    private readonly getAllArtistsUseCase: GetAllArtistsUseCase,
    private readonly getArtistByIdUseCase: GetArtistByIdUseCase,
    private readonly getAllArtistPostsUseCase: GetAllArtistPostsUseCase,
    private readonly getArtistCategoriesUseCase: GetArtistCategoriesUseCase,
    private readonly getOneArtistPostUseCase: GetOneArtistPostUseCase,
    private readonly getLastRegisteredArtistsPostsUseCase: GetLastRegisteredArtistsPostsUseCase,
    private readonly createArtistUseCase: CreateArtistUseCase,
    private readonly updateArtistUseCase: UpdateArtistUseCase,
    private readonly removeArtistUseCase: RemoveArtistUseCase,
    private readonly getRandomArtistsPostUseCase: GetRandomArtistsPostUseCase,
    private readonly getAllArtistsWithPinnedPostUseCase: GetAllArtistsWithPinnedPostUseCase,
  ) {}

  /**
   * Get all artists
   * @returns {Promise<Artist[]>} Array of all artists
   */
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'Return all artists.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Permissions('read:allArtist')
  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return this.getAllArtistsUseCase.execute();
  }

  /**
   * Get all artists with pinned posts
   * @returns {Promise<{artist: Artist; pinnedPost: PostEntity; postAssets: Asset[]; artistAsset: Asset}[]>} All artists with pinned posts
   */
  @ApiOperation({ summary: 'Get all artists with pinned post' })
  @ApiResponse({
    status: 200,
    description: 'All artists with pinned post.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Permissions('read:allArtist')
  @Get('withPinnedPost')
  async getAllArtistsWithPinnedPost(): Promise<
    {
      artist: Artist;
      pinnedPost: PostEntity;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    return this.getAllArtistsWithPinnedPostUseCase.execute();
  }

  /**
   * Get an artist by ID
   * @param {FindIdParams} params - Parameters to find the artist
   * @returns {Promise<Artist>} The artist data
   */
  @ApiOperation({ summary: 'Get an artist by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the artist' })
  @ApiResponse({ status: 200, description: 'The artist data.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:allArtist')
  @Get(':id')
  async getArtistById(@Param() params: FindIdParams): Promise<Artist> {
    const artistId = new ArtistId(params.id);
    return this.getArtistByIdUseCase.execute(artistId);
  }

  /**
   * Get all artist's posts
   * @param {FindIdParams} params - Parameters to find the artist
   * @returns {Promise<PostEntity[]>} The artist's posts
   */
  @ApiOperation({ summary: "Get all artist's posts" })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the artist' })
  @ApiResponse({ status: 200, description: "The artist's posts." })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Permissions('read:posts')
  @Get(':id/posts')
  async getArtistPosts(@Param() params: FindIdParams): Promise<PostEntity[]> {
    const artistId = new ArtistId(params.id);
    return this.getAllArtistPostsUseCase.execute(artistId);
  }

  /**
   * Get an artist's categories
   * @param {FindIdParams} params - Parameters to find the artist
   * @returns {Promise<Category[]>} The artist's categories
   */
  @ApiOperation({ summary: "Get an artist's categories" })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the artist' })
  @ApiResponse({ status: 200, description: "The artist's categories." })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:all')
  @Get(':id/categories')
  async getArtistCategories(
    @Param() params: FindIdParams,
  ): Promise<Category[]> {
    const artistId = new ArtistId(params.id);
    return this.getArtistCategoriesUseCase.execute(artistId);
  }

  /**
   * Get a specific post of an artist
   * @param {FindArtistPostParams} params - Parameters to find the artist and the post
   * @returns {Promise<PostEntity>} The artist's post
   */
  @ApiOperation({ summary: 'Get a specific post of an artist' })
  @ApiParam({
    name: 'artistId',
    required: true,
    description: 'The ID of the artist',
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: 'The ID of the post',
  })
  @ApiResponse({ status: 200, description: "The artist's post." })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Artist or post not found' })
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Permissions('read:all')
  @Get(':artistId/posts/:postId')
  async getOneArtistPost(
    @Param() params: FindArtistPostParams,
  ): Promise<PostEntity> {
    const artistId = new ArtistId(params.artistId);
    const postId = new PostId(params.postId);
    return this.getOneArtistPostUseCase.execute(artistId, postId);
  }

  /**
   * Get the last registered artists' posts
   * @param {FindNumberParams} params - Parameters to specify the number of posts
   * @returns {Promise<{artist: Artist; pinnedPost: PostEntity; postAssets: Asset[]; artistAsset: Asset}[]>} The last registered artists' posts
   */
  @ApiOperation({ summary: "Get the last registered artists' posts" })
  @ApiParam({
    name: 'nb',
    required: true,
    description: 'The number of posts to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: "The last registered artists' posts.",
  })
  @Get('last/:nb')
  async getLastRegisteredArtistsPosts(
    @Param() params: FindNumberParams,
  ): Promise<
    {
      artist: Artist;
      pinnedPost: PostEntity;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    return this.getLastRegisteredArtistsPostsUseCase.execute(params.nb);
  }

  /**
   * Get nb randoms artist's post
   * @param {FindNumberParams} params - Parameters to specify the number of posts
   * @returns {Promise<{artist: Artist; pinnedPost: PostEntity; postAssets: Asset[]; artistAsset: Asset}[]>} The nb randoms artist's post
   */
  @ApiOperation({ summary: "Get nb random artist's post" })
  @ApiParam({
    name: 'nb',
    required: true,
    description: 'The number of posts to retrieve',
  })
  @ApiResponse({ status: 200, description: "The random artist's post." })
  @Get('random/:nb')
  async getRandomArtistsPost(@Param() params: FindNumberParams): Promise<
    {
      artist: Artist;
      pinnedPost: PostEntity;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    return this.getRandomArtistsPostUseCase.execute(params.nb);
  }

  /**
   * Create a new artist
   * @param {CreateArtistDto} artistData - Data to create the artist
   * @param {Object} files - Uploaded files
   * @returns {Promise<{ message: string; artistId: string }>} The created artist's ID
   */
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The artist has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    description: 'Data for artist creation',
    type: CreateArtistDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('create:artist')
  @Post()
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldNames: [
        { name: 'profilePicture', maxCount: 1 },
        { name: 'postPicture', maxCount: 1 },
      ],
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const acceptedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (acceptedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
      },
    }),
  )
  async createArtist(
    @UploadedFiles() files: FileUploadDto,
    @Body() artistData: CreateArtistDto,
  ): Promise<{ message: string; artistId: string }> {
    const artist = await this.createArtistUseCase.execute(artistData, files);

    return {
      message: 'Success',
      artistId: artist.id,
    };
  }

  /**
   * Update an artist
   * @param {FindIdParams} params - Parameters to find the artist
   * @param {File} file - Uploaded file for profile picture
   * @param {UpdateArtistDto} artistData - Data to update the artist
   * @returns {Promise<Artist>} The updated artist data
   */
  @ApiOperation({ summary: 'Update an artist' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the artist' })
  @ApiBody({ description: 'Data for artist update', type: UpdateArtistDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'The artist has been updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @ApiBearerAuth()
  @Permissions('update:artist')
  @Patch(':id')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldNames: [{ name: 'profilePicture', maxCount: 1 }],
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const acceptedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (acceptedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
      },
    }),
  )
  async updateArtist(
    @Param() params: FindIdParams,
    @UploadedFiles() file: File,
    @Body() artistData: UpdateArtistDto,
  ): Promise<Artist> {
    const artistId = new ArtistId(params.id);
    return this.updateArtistUseCase.execute(artistId, artistData, file);
  }

  /**
   * Delete an artist
   * @param {FindIdParams} params - Parameters to find the artist
   * @returns {Promise<Artist>} The deleted artist data
   */
  @ApiOperation({ summary: 'Delete an artist' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the artist' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been deleted successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @ApiBearerAuth()
  @Permissions('delete:artist')
  @Delete(':id')
  async removeArtist(@Param() params: FindIdParams): Promise<Artist> {
    const artistId = new ArtistId(params.id);
    return this.removeArtistUseCase.execute(artistId);
  }

  /**
   * Delete own artist profile
   * @param {FindIdParams} params - Parameters to find the artist profile
   * @returns {Promise<Artist>} The deleted artist data
   */
  @ApiOperation({ summary: 'Delete own artist profile' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the artist' })
  @ApiResponse({
    status: 200,
    description: 'The artist profile has been deleted successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('delete:me')
  @Delete('me/:id')
  async removeMyArtistProfile(
    @Param() params: FindIdParams,
    @GetUser() user: any,
  ): Promise<Artist> {
    const artistId = new ArtistId(params.id);
    const artist = await this.getArtistByIdUseCase.execute(artistId);

    if (artist.auth0Id !== user.auth0Id) {
      throw new UnauthorizedException('You can only access your own data');
    }

    return this.removeArtistUseCase.execute(artistId);
  }
}
