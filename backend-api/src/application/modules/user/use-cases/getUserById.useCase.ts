import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(userId: UserId): Promise<User> {
    const amateur = await this.userRepository.findUserById(userId);
    if (!amateur) {
      throw new NotFoundException(`User not found with ID: ${userId}`);
    }
    return amateur;
  }
}
