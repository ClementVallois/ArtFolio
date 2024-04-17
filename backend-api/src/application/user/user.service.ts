import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../presentation/user/dto/create-user.dto';
import { UpdateUserDto } from '../../presentation/user/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(
        'Error getting users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserById(id: string): Promise<User> {
    if (!id) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const createUser = this.userRepository.create(userData);
      await this.userRepository.save(createUser);
      return createUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          'User with this ID already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    throw new HttpException(
      'Error creating user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const existingUser = await this.getUserById(id);
    this.userRepository.merge(existingUser, user);
    return this.userRepository.save(existingUser);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.getUserById(id);
    return this.userRepository.remove(user);
  }
}
