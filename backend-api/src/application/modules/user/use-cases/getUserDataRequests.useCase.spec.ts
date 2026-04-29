import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserDataRequestsUseCase } from './getUserDataRequests.useCase';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { UserId } from 'src/domain/value-objects/userId';

describe('GetUserDataRequestsUseCase', () => {
  let useCase: GetUserDataRequestsUseCase;
  let personalDataRequestRepository: jest.Mocked<IPersonalDataRequestRepository>;

  const validUserId = new UserId('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

  const mockDataRequests: PersonalDataRequest[] = [
    {
      id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      user: { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' } as any,
      status: 'requested',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserDataRequestsUseCase,
        {
          provide: 'IPersonalDataRequestRepository',
          useValue: {
            findPersonalDataRequestsByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(GetUserDataRequestsUseCase);
    personalDataRequestRepository = module.get(
      'IPersonalDataRequestRepository',
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return data requests for a user', async () => {
    personalDataRequestRepository.findPersonalDataRequestsByUserId.mockResolvedValue(
      mockDataRequests,
    );

    const result = await useCase.execute(validUserId);

    expect(result).toEqual(mockDataRequests);
    expect(
      personalDataRequestRepository.findPersonalDataRequestsByUserId,
    ).toHaveBeenCalledWith(validUserId);
  });

  it('should throw NotFoundException when no data requests found', async () => {
    personalDataRequestRepository.findPersonalDataRequestsByUserId.mockResolvedValue(
      [],
    );

    await expect(useCase.execute(validUserId)).rejects.toThrow(
      NotFoundException,
    );
    await expect(useCase.execute(validUserId)).rejects.toThrow(
      `Data Requests not found for User with ID: ${validUserId}`,
    );
  });

  it('should throw NotFoundException when result is null', async () => {
    personalDataRequestRepository.findPersonalDataRequestsByUserId.mockResolvedValue(
      null,
    );

    await expect(useCase.execute(validUserId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
