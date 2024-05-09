import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../presentation/user/dto/create-user.dto';
import { UpdateUserDto } from '../../presentation/user/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';
import { Asset } from 'src/infrastructure/entities/asset.entity';
import { DataRequest } from 'src/infrastructure/entities/data-request.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(DataRequest)
    private readonly dataRequestRepository: Repository<DataRequest>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findBy({ role: 'user' });
    } catch (error) {
      throw new HttpException(
        'Error getting users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
    return user;
  }

  async getUserByAuth0Id(auth0Id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ auth0Id: auth0Id });
    if (!user) {
      throw new NotFoundException(`User not found with Auth0 ID: ${auth0Id}`);
    }
    return user;
  }

  async getUserAssets(userId: string): Promise<Asset[]> {
    const userAssets = await this.assetRepository.find({
      where: { userId: { id: userId }, type: 'profile_picture' },
    });

    if (!userAssets || userAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for User with ID: ${userId}`,
      );
    }
    return userAssets;
  }

  async getUserDataRequests(userId: string): Promise<DataRequest[]> {
    const dataRequests = await this.dataRequestRepository.find({
      where: { user: { id: userId } },
    });
    if (!dataRequests || dataRequests.length === 0) {
      throw new NotFoundException(
        `Data Requests not found for User with ID: ${userId}`,
      );
    }
    return dataRequests;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const userToCreate = this.userRepository.create(userData);
      return await this.userRepository.save(userToCreate);
    } catch (error) {
      if (error.code === '23505') {
        let errorMessage: string;
        if (error.detail.includes('username')) {
          errorMessage = `Artist with username ${userData.username} already exists`;
        } else if (error.detail.includes('auth0_id')) {
          errorMessage = `Artist with Auth0 ID ${userData.auth0Id} already exists`;
        } else {
          errorMessage = 'Error creating artist';
        }
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }
    }
    throw new HttpException(
      'Error creating user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const existingUser = await this.getUserById(id);
    this.userRepository.merge(existingUser, userData);
    return this.userRepository.save(existingUser);
  }

  async removeUser(id: string): Promise<User> {
    const user = await this.getUserById(id);
    return this.userRepository.remove(user);
  }
}
