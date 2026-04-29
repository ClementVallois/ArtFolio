import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

@Injectable()
export class GetUserByAuth0IdUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(auth0Id: string): Promise<User> {
    const user = await this.userRepository.findUserByAuth0Id(auth0Id);
    if (!user) {
      throw new NotFoundException(`User not found with Auth0 ID: ${auth0Id}`);
    }
    return user;
  }
}
