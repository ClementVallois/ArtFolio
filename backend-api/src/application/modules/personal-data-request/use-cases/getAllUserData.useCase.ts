import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPersonalDataRequestRepository } from 'src/domain/interfaces/personal-data-request.repository.interface';
import { LogMethod } from 'src/infrastructure/logger/decorators/log-method.decorator';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';
import * as fs from 'fs';
import * as path from 'path';
import { PersonalDataRequestId } from 'src/domain/value-objects/personalDataRequestId';

@Injectable()
export class GetAllUserDataUseCase {
  constructor(
    @Inject('IPersonalDataRequestRepository')
    private readonly personalDataRequestRepository: IPersonalDataRequestRepository,
  ) {}

  @LogMethod(LogLevel.DEBUG)
  async execute(
    requestId: PersonalDataRequestId,
  ): Promise<{ filePath: string; userId: string }> {
    const personalDataRequest =
      await this.personalDataRequestRepository.getPersonalDataRequestById(
        requestId,
      );

    if (!personalDataRequest) {
      throw new NotFoundException(
        `Personal data request not found with ID: ${requestId}`,
      );
    }

    const userData =
      await this.personalDataRequestRepository.getAllPersonalDataByRequestId(
        requestId,
      );

    if (!userData) {
      throw new NotFoundException(
        `User data not found for request ID: ${requestId}`,
      );
    }

    const fileName = `user-data-${personalDataRequest.user.id}-${Date.now()}.json`;
    const filePath = path.join(process.cwd(), 'temp', fileName);

    await fs.promises.writeFile(filePath, JSON.stringify(userData, null, 2));

    // Update status to 'processed' after file generation
    await this.personalDataRequestRepository.updatePersonalDataRequest(
      requestId,
      { status: 'processed' },
    );

    return { filePath, userId: personalDataRequest.user.id };
  }
}
