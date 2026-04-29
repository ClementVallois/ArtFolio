import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetPostByIdUseCase } from './getPostById.useCase';
import { IPostRepository } from 'src/domain/interfaces/post.repository.interface';
import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { Post } from 'src/domain/entities/post.entity';
import { PostId } from 'src/domain/value-objects/postId';

describe('GetPostByIdUseCase', () => {
  let useCase: GetPostByIdUseCase;
  let postRepository: jest.Mocked<IPostRepository>;
  let logger: jest.Mocked<Logger>;

  const validPostId = new PostId('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

  const mockPost: Post = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    isPinned: false,
    description: 'A beautiful painting',
    user: {
      id: 'b1ffcd00-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('1990-01-01'),
      username: 'johndoe',
      description: 'Artist',
      status: 'active',
      role: 'artist',
      auth0Id: 'auth0|123',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPostByIdUseCase,
        {
          provide: 'IPostRepository',
          useValue: { findPostById: jest.fn() },
        },
        {
          provide: Logger,
          useValue: {
            info: jest.fn(),
            debug: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(GetPostByIdUseCase);
    postRepository = module.get('IPostRepository');
    logger = module.get(Logger);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a post when found', async () => {
    postRepository.findPostById.mockResolvedValue(mockPost);

    const result = await useCase.execute(validPostId);

    expect(result).toEqual(mockPost);
    expect(postRepository.findPostById).toHaveBeenCalledWith(validPostId);
  });

  it('should throw NotFoundException when post is not found', async () => {
    postRepository.findPostById.mockResolvedValue(null);

    await expect(useCase.execute(validPostId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should re-throw errors from the repository', async () => {
    const dbError = new Error('Connection lost');
    postRepository.findPostById.mockRejectedValue(dbError);

    await expect(useCase.execute(validPostId)).rejects.toThrow(
      'Connection lost',
    );
    expect(logger.error).toHaveBeenCalled();
  });
});
