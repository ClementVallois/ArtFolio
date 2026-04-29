import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserByIdUseCase } from './getUserById.useCase';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';
import { UserId } from 'src/domain/value-objects/userId';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  const validUserId = new UserId('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

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
        GetUserByIdUseCase,
        {
          provide: 'IUserRepository',
          useValue: { findUserById: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get(GetUserByIdUseCase);
    userRepository = module.get('IUserRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a user when found', async () => {
    userRepository.findUserById.mockResolvedValue(mockUser);

    const result = await useCase.execute(validUserId);

    expect(result).toEqual(mockUser);
    expect(userRepository.findUserById).toHaveBeenCalledWith(validUserId);
  });

  it('should throw NotFoundException when user is not found', async () => {
    userRepository.findUserById.mockResolvedValue(null);

    await expect(useCase.execute(validUserId)).rejects.toThrow(
      NotFoundException,
    );
    await expect(useCase.execute(validUserId)).rejects.toThrow(
      `User not found with ID: ${validUserId}`,
    );
  });
});
