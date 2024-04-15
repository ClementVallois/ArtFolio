import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async createUser(userData: CreateUserDto) {
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

  //TODO : Add the rest of the methods
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
