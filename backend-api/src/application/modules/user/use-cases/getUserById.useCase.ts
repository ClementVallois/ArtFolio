import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: UserId): Promise<User> {
    const amateur = await this.userRepository.findUserById(userId);
    if (!amateur) {
      throw new NotFoundException(`Amateur not found with ID: ${userId}`);
    }
    return amateur;
  }
}
