import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '@nestjs/passport';
import { ArtistController } from 'src/presentation/controllers/artist.controller';
import { ArtistService } from 'src/application/services/artist.service';
import {
  FindIdParams,
  FindNumberParams,
  FindUserPostParams,
} from 'src/presentation/utils/params.dto';

describe('ArtistController', () => {
  let artistController: ArtistController;
  let artistService: ArtistService;

  beforeEach(async () => {
    const mockArtistService = {
      getAllArtists: jest.fn().mockResolvedValue([
        { id: 1, name: 'Artist 1' },
        { id: 2, name: 'Artist 2' },
        { id: 3, name: 'Artist 3' },
      ]),
      getArtistById: jest.fn().mockResolvedValue({ id: 1, name: 'Artist 1' }),
      getArtistPosts: jest.fn().mockResolvedValue([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ]),
      getArtistCategories: jest.fn().mockResolvedValue([
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
      ]),
      getOneArtistPost: jest.fn().mockResolvedValue({ id: 1, title: 'Post 1' }),
      getLastRegisteredArtistsPosts: jest.fn().mockResolvedValue([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ]),
      getRandomArtistsPost: jest.fn().mockResolvedValue([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: mockArtistService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    artistController = module.get<ArtistController>(ArtistController);
    artistService = module.get<ArtistService>(ArtistService);
  });

  it('should return the correct number of artists', async () => {
    const result = await artistController.getAllArtists();
    expect(result).toHaveLength(3);
    expect(artistService.getAllArtists).toHaveBeenCalled();
  });

  it('should return the correct artist by ID', async () => {
    const id = '1';
    const params: FindIdParams = { id };
    const result = await artistController.getArtistById(params);
    expect(result).toEqual({ id: 1, name: 'Artist 1' });
    expect(artistService.getArtistById).toHaveBeenCalledWith(id);
  });

  it('should return the correct posts for an artist by ID', async () => {
    const id = '1';
    const params: FindIdParams = { id };
    const result = await artistController.getArtistPosts(params);
    expect(result).toEqual([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ]);
    expect(artistService.getAllArtistPosts).toHaveBeenCalledWith(id);
  });

  it('should return the correct categories for an artist by ID', async () => {
    const id = '1';
    const params: FindIdParams = { id };
    const result = await artistController.getArtistCategories(params);
    expect(result).toEqual([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ]);
    expect(artistService.getArtistCategories).toHaveBeenCalledWith(id);
  });

  it('should return the correct post for an artist by userId and postId', async () => {
    const params: FindUserPostParams = { userId: '1', postId: '1' };
    const result = await artistController.getOneArtistPost(params);
    expect(result).toEqual({ id: 1, title: 'Post 1' });
    expect(artistService.getOneArtistPost).toHaveBeenCalledWith(
      params.userId,
      params.postId,
    );
  });

  it('should return the correct number of last registered artists posts', async () => {
    const params: FindNumberParams = { nb: 2 };
    const result = await artistController.getLastRegisteredArtistsPosts(params);
    expect(result).toEqual([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ]);
    expect(artistService.getLastRegisteredArtistsPosts).toHaveBeenCalledWith(
      params.nb,
    );
  });

  it('should return the correct number of random artists posts', async () => {
    const params: FindNumberParams = { nb: 2 };
    const result = await artistController.getRandomArtistsPost(params);
    expect(result).toEqual([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ]);
    expect(artistService.getRandomArtistsPost).toHaveBeenCalledWith(params.nb);
  });
});
