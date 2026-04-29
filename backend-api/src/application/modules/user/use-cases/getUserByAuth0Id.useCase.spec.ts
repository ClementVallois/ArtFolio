import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserByAuth0IdUseCase } from './getUserByAuth0Id.useCase';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';

describe('GetUserByAuth0IdUseCase', () => {
  let useCase: GetUserByAuth0IdUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  const mockUser: User = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    firstName: 'Jane',
    lastName: 'Smith',
    birthDate: new Date('1985-05-15'),
    username: 'janesmith',
    description: 'Art enthusiast',
    status: 'active',
    role: 'amateur',
    auth0Id: 'auth0|987654321',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByAuth0IdUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findUserByAuth0Id: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(GetUserByAuth0IdUseCase);
    userRepository = module.get('IUserRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a user when found by Auth0 ID', async () => {
    userRepository.findUserByAuth0Id.mockResolvedValue(mockUser);

    const result = await useCase.execute('auth0|987654321');

    expect(result).toEqual(mockUser);
    expect(userRepository.findUserByAuth0Id).toHaveBeenCalledWith(
      'auth0|987654321',
    );
  });

  it('should throw NotFoundException when user is not found', async () => {
    userRepository.findUserByAuth0Id.mockResolvedValue(null);

    await expect(useCase.execute('auth0|nonexistent')).rejects.toThrow(
      NotFoundException,
    );
    await expect(useCase.execute('auth0|nonexistent')).rejects.toThrow(
      'User not found with Auth0 ID: auth0|nonexistent',
    );
  });
});
