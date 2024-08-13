import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { UserId } from 'src/domain/value-objects/userId';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
@Injectable()
export class GetAllUserDataUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(id: UserId): Promise<any> {
    const userData =
      await this.personalDataRequestRepository.getAllPersonalDataByUserId(id);

    if (
      !userData ||
      (userData.fetch_user_data.user === null &&
        userData.fetch_user_data.posts === null &&
        userData.fetch_user_data.assets === null &&
        userData.fetch_user_data.categories === null &&
        userData.fetch_user_data.personal_data_requests === null)
    ) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
    return userData;
  }
}
