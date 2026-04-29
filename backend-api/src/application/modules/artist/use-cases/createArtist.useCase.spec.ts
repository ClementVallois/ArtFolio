import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { CreateArtistUseCase } from './createArtist.useCase';
import { ValidationService } from 'src/application/validators/validation.service';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { PostPictureService } from 'src/infrastructure/services/file/post-picture.service';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { Category } from 'src/domain/entities/category.entity';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { FileUploadDto } from 'src/presentation/dto/artist/fileUpload.dto';

describe('CreateArtistUseCase', () => {
  let useCase: CreateArtistUseCase;
  let validationService: jest.Mocked<ValidationService>;
  let databaseErrorHandler: jest.Mocked<DatabaseErrorHandler>;
  let profilePictureService: jest.Mocked<ProfilePictureService>;
  let postPictureService: jest.Mocked<PostPictureService>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockManager: any;
  let dataSourceTransactionMock: jest.Mock;

  const mockArtist: User = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    firstName: 'John',
    lastName: 'Doe',
    birthDate: new Date('1990-01-01'),
    username: 'johndoe',
    description: 'A talented artist',
    status: 'active',
    role: 'artist',
    auth0Id: 'auth0|123456789',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockPost: Post = {
    id: 'post-uuid-1',
    isPinned: true,
    description: 'My first post',
    user: mockArtist,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockCategory: Category = {
    id: 'cat-uuid-1',
    name: 'Painting',
    description: 'Painting category',
    user: [],
    post: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockAsset: Asset = {
    id: 'asset-uuid-1',
    url: '/uploads/profile/profile.png',
    type: 'profile_picture',
    mimetype: 'image/png',
    userId: mockArtist,
    postId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockFiles: FileUploadDto = {
    profilePicture: [{ fieldname: 'profilePicture', mimetype: 'image/png' }],
    postPicture: [{ fieldname: 'postPicture', mimetype: 'image/jpeg' }],
  } as any;

  const mockArtistData: Partial<CreateArtistDto> = {
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    username: 'johndoe',
    description: 'A talented artist',
    status: 'active',
    role: 'artist',
    auth0Id: 'auth0|123456789',
    post: { isPinned: true, description: 'My first post', artistId: '' } as any,
    category: { categories: ['cat-uuid-1'] } as any,
  };

  beforeEach(async () => {
    mockManager = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    } as any;

    dataSourceTransactionMock = jest
      .fn()
      .mockImplementation(async (cb) => cb(mockManager));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateArtistUseCase,
        {
          provide: getDataSourceToken(),
          useValue: { transaction: dataSourceTransactionMock },
        },
        {
          provide: ValidationService,
          useValue: {
            validateArtistCategories: jest.fn(),
            validateProfilePicture: jest.fn(),
            validatePostPicture: jest.fn(),
          },
        },
        {
          provide: DatabaseErrorHandler,
          useValue: { handleDatabaseError: jest.fn() },
        },
        {
          provide: ProfilePictureService,
          useValue: {
            saveProfilePicture: jest.fn(),
          },
        },
        {
          provide: PostPictureService,
          useValue: {
            savePostPicture: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(CreateArtistUseCase);
    validationService = module.get(ValidationService);
    databaseErrorHandler = module.get(DatabaseErrorHandler);
    profilePictureService = module.get(ProfilePictureService);
    postPictureService = module.get(PostPictureService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an artist and return it within a transaction', async () => {
    validationService.validateArtistCategories.mockResolvedValue();
    validationService.validateProfilePicture.mockResolvedValue();
    validationService.validatePostPicture.mockResolvedValue();

    profilePictureService.saveProfilePicture.mockResolvedValue({
      filePath: '/uploads/profile/profile.png',
      fileType: 'image/png',
    });
    postPictureService.savePostPicture.mockResolvedValue({
      filePath: '/uploads/posts/post.jpg',
      fileType: 'image/jpeg',
    });

    mockManager.create
      .mockReturnValueOnce(mockArtist)
      .mockReturnValueOnce(mockAsset)
      .mockReturnValueOnce(mockPost)
      .mockReturnValueOnce({ ...mockAsset, type: 'post_picture' });
    mockManager.save
      .mockResolvedValueOnce(mockArtist)
      .mockResolvedValueOnce(mockAsset)
      .mockResolvedValueOnce(mockPost)
      .mockResolvedValueOnce({ ...mockAsset, type: 'post_picture' })
      .mockResolvedValueOnce(mockCategory);
    mockManager.findOne.mockResolvedValue(mockCategory);

    const result = await useCase.execute(
      mockArtistData as CreateArtistDto,
      mockFiles,
    );

    expect(result).toEqual(mockArtist);
    expect(dataSourceTransactionMock).toHaveBeenCalledTimes(1);
    expect(profilePictureService.saveProfilePicture).toHaveBeenCalledWith(
      mockArtistData.auth0Id,
      mockFiles.profilePicture[0],
    );
    expect(postPictureService.savePostPicture).toHaveBeenCalledWith(
      mockPost.id,
      mockFiles.postPicture[0],
    );
    expect(mockManager.findOne).toHaveBeenCalledWith(Category, {
      where: { id: 'cat-uuid-1' },
    });
  });

  it('should throw BadRequestException when profile picture validation fails', async () => {
    validationService.validateArtistCategories.mockResolvedValue();
    validationService.validateProfilePicture.mockRejectedValue(
      new BadRequestException('Profile picture file is required.'),
    );

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(BadRequestException);

    expect(dataSourceTransactionMock).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException when post picture validation fails', async () => {
    validationService.validateArtistCategories.mockResolvedValue();
    validationService.validateProfilePicture.mockResolvedValue();
    validationService.validatePostPicture.mockRejectedValue(
      new BadRequestException('Post picture file is required.'),
    );

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(BadRequestException);

    expect(dataSourceTransactionMock).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when a category does not exist', async () => {
    validationService.validateArtistCategories.mockResolvedValue();
    validationService.validateProfilePicture.mockResolvedValue();
    validationService.validatePostPicture.mockResolvedValue();

    profilePictureService.saveProfilePicture.mockResolvedValue({
      filePath: '/uploads/profile/profile.png',
      fileType: 'image/png',
    });
    postPictureService.savePostPicture.mockResolvedValue({
      filePath: '/uploads/posts/post.jpg',
      fileType: 'image/jpeg',
    });

    mockManager.create
      .mockReturnValueOnce(mockArtist)
      .mockReturnValueOnce(mockAsset)
      .mockReturnValueOnce(mockPost)
      .mockReturnValueOnce({ ...mockAsset, type: 'post_picture' });
    mockManager.save
      .mockResolvedValueOnce(mockArtist)
      .mockResolvedValueOnce(mockAsset)
      .mockResolvedValueOnce(mockPost)
      .mockResolvedValueOnce({ ...mockAsset, type: 'post_picture' });
    mockManager.findOne.mockResolvedValue(null);

    dataSourceTransactionMock.mockImplementation(async (cb) => cb(mockManager));

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(NotFoundException);
  });

  it('should clean up saved files and delegate to DatabaseErrorHandler on DB error', async () => {
    validationService.validateArtistCategories.mockResolvedValue();
    validationService.validateProfilePicture.mockResolvedValue();
    validationService.validatePostPicture.mockResolvedValue();

    profilePictureService.saveProfilePicture.mockResolvedValue({
      filePath: '/uploads/profile/profile.png',
      fileType: 'image/png',
    });

    const dbError = {
      code: '23505',
      detail: 'Key (username)=(johndoe) already exists.',
    };
    databaseErrorHandler.handleDatabaseError.mockImplementation(() => {
      throw new HttpException('User with username johndoe already exists', 400);
    });

    dataSourceTransactionMock.mockRejectedValue(dbError);

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(HttpException);

    expect(databaseErrorHandler.handleDatabaseError).toHaveBeenCalledWith(
      dbError,
      mockArtistData,
    );
  });
});
