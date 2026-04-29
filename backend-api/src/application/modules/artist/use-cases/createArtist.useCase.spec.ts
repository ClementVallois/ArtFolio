import { Test, TestingModule } from '@nestjs/testing';
import { CreateArtistUseCase } from './createArtist.useCase';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { ValidationService } from 'src/application/validators/validation.service';
import { DatabaseErrorHandler } from 'src/infrastructure/errors/databaseErrorHandler';
import { ProfilePictureHandler } from 'src/application/handlers/profile-picture.handler';
import { AssignCategoriesToArtistUseCase } from 'src/application/shared/modules/category/use-cases/assignCategoriesToArtist.useCase';
import { CreatePostUseCase } from 'src/application/shared/modules/post/use-cases/createPost.useCase';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { User as Artist } from 'src/domain/entities/user.entity';
import { CreateArtistDto } from 'src/presentation/dto/artist/create-artist.dto';
import { FileUploadDto } from 'src/presentation/dto/artist/fileUpload.dto';

describe('CreateArtistUseCase', () => {
  let useCase: CreateArtistUseCase;
  let artistRepository: jest.Mocked<IArtistRepository>;
  let validationService: jest.Mocked<ValidationService>;
  let databaseErrorHandler: jest.Mocked<DatabaseErrorHandler>;
  let profilePictureHandler: jest.Mocked<ProfilePictureHandler>;
  let assignCategoriesToArtistUseCase: jest.Mocked<AssignCategoriesToArtistUseCase>;
  let createPostUseCase: jest.Mocked<CreatePostUseCase>;

  const mockArtist: Artist = {
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateArtistUseCase,
        {
          provide: 'IArtistRepository',
          useValue: { createArtist: jest.fn() },
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
          provide: ProfilePictureHandler,
          useValue: { createOrUpdateProfilePicture: jest.fn() },
        },
        {
          provide: AssignCategoriesToArtistUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreatePostUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get(CreateArtistUseCase);
    artistRepository = module.get('IArtistRepository');
    validationService = module.get(ValidationService);
    databaseErrorHandler = module.get(DatabaseErrorHandler);
    profilePictureHandler = module.get(ProfilePictureHandler);
    assignCategoriesToArtistUseCase = module.get(
      AssignCategoriesToArtistUseCase,
    );
    createPostUseCase = module.get(CreatePostUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an artist and return it', async () => {
    artistRepository.createArtist.mockResolvedValue(mockArtist);

    const result = await useCase.execute(
      mockArtistData as CreateArtistDto,
      mockFiles,
    );

    expect(result).toEqual(mockArtist);
    expect(validationService.validateArtistCategories).toHaveBeenCalledWith(
      mockArtistData,
    );
    expect(validationService.validateProfilePicture).toHaveBeenCalledWith(
      mockFiles,
    );
    expect(validationService.validatePostPicture).toHaveBeenCalledWith(
      mockFiles,
    );
    expect(artistRepository.createArtist).toHaveBeenCalledWith(mockArtistData);
    expect(
      profilePictureHandler.createOrUpdateProfilePicture,
    ).toHaveBeenCalledWith(mockArtist, mockFiles.profilePicture[0]);
    expect(createPostUseCase.execute).toHaveBeenCalledWith(
      {
        isPinned: mockArtistData.post.isPinned,
        description: mockArtistData.post.description,
        artistId: mockArtist.id,
      },
      mockFiles.postPicture[0],
    );
    expect(assignCategoriesToArtistUseCase.execute).toHaveBeenCalled();
  });

  it('should throw BadRequestException when profile picture is missing', async () => {
    validationService.validateArtistCategories.mockResolvedValue();
    validationService.validateProfilePicture.mockRejectedValue(
      new BadRequestException('Profile picture file is required.'),
    );

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(BadRequestException);

    expect(artistRepository.createArtist).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException when post picture is missing', async () => {
    validationService.validateArtistCategories.mockResolvedValue();
    validationService.validateProfilePicture.mockResolvedValue();
    validationService.validatePostPicture.mockRejectedValue(
      new BadRequestException('Post picture file is required.'),
    );

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(BadRequestException);

    expect(artistRepository.createArtist).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when a category does not exist', async () => {
    validationService.validateArtistCategories.mockRejectedValue(
      new NotFoundException('One or more categories do not exist.'),
    );

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(NotFoundException);

    expect(artistRepository.createArtist).not.toHaveBeenCalled();
  });

  it('should delegate to DatabaseErrorHandler on database error', async () => {
    const dbError = new Error('Duplicate key');
    artistRepository.createArtist.mockRejectedValue(dbError);
    databaseErrorHandler.handleDatabaseError.mockImplementation(() => {
      throw new HttpException('User with username johndoe already exists', 400);
    });

    await expect(
      useCase.execute(mockArtistData as CreateArtistDto, mockFiles),
    ).rejects.toThrow(HttpException);

    expect(databaseErrorHandler.handleDatabaseError).toHaveBeenCalledWith(
      dbError,
      mockArtistData,
    );
    expect(
      profilePictureHandler.createOrUpdateProfilePicture,
    ).not.toHaveBeenCalled();
  });
});
