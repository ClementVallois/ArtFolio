import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IArtistRepository } from 'src/domain/interfaces/artist.repository.interface';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { User as Artist } from 'src/domain/entities/user.entity';
import { Cache } from 'cache-manager';
import { GetAllArtistsUseCase } from 'src/application/modules/artist/use-cases/getAllArtists.useCase';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('GetAllArtistsUseCase', () => {
  let useCase: GetAllArtistsUseCase;
  let artistRepository: jest.Mocked<IArtistRepository>;
  let logger: jest.Mocked<Logger>;
  let cacheManager: jest.Mocked<Cache>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllArtistsUseCase,
        {
          provide: 'IArtistRepository',
          useValue: {
            findAllByDescCreateDate: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            debug: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAllArtistsUseCase>(GetAllArtistsUseCase);
    artistRepository = module.get('IArtistRepository');
    logger = module.get(Logger);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return cached artists if available', async () => {
    const cachedArtists: Artist[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01'),
        username: 'Johndoe90',
        description: 'A great artist',
        status: 'active',
        role: 'artist',
        auth0Id: 'auth0|123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    cacheManager.get.mockResolvedValue(cachedArtists);

    const result = await useCase.execute();

    expect(result).toEqual(cachedArtists);
    expect(cacheManager.get).toHaveBeenCalledWith('all_artists');
    expect(logger.debug).toHaveBeenCalledWith('Retrieved 1 artists from cache');
    expect(artistRepository.findAllByDescCreateDate).not.toHaveBeenCalled();
  });

  it('should fetch artists from repository if not cached', async () => {
    const artists: Artist[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01'),
        username: 'Johndoe90',
        description: 'A great artist',
        status: 'active',
        role: 'artist',
        auth0Id: 'auth0|123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        birthDate: new Date('1985-05-15'),
        username: 'Janesmith85',
        description: 'An amazing artist',
        status: 'active',
        role: 'artist',
        auth0Id: 'auth0|789012',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    cacheManager.get.mockResolvedValue(null);
    artistRepository.findAllByDescCreateDate.mockResolvedValue(artists);

    const result = await useCase.execute();

    expect(result).toEqual(artists);
    expect(cacheManager.get).toHaveBeenCalledWith('all_artists');
    expect(artistRepository.findAllByDescCreateDate).toHaveBeenCalled();
    expect(cacheManager.set).toHaveBeenCalledWith(
      'all_artists',
      artists,
      10000,
    );
    expect(logger.debug).toHaveBeenCalledWith('Found 2 artists from database');
  });

  it('should throw HttpException if no artists found', async () => {
    cacheManager.get.mockResolvedValue(null);
    artistRepository.findAllByDescCreateDate.mockResolvedValue([]);

    await expect(useCase.execute()).rejects.toThrow(
      new HttpException(
        'Error getting artists: No artists found',
        HttpStatus.NOT_FOUND,
      ),
    );
  });

  it('should throw HttpException on error', async () => {
    const error = new Error('Database error');
    cacheManager.get.mockResolvedValue(null);
    artistRepository.findAllByDescCreateDate.mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow(
      new HttpException(
        'Error getting artists: Database error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
    expect(logger.error).toHaveBeenCalledWith(
      'Error getting artists: Database error',
      error,
    );
  });
});
