import { PersonalDataRequest } from '../entities/personal-data-request.entity';
import { PersonalDataRequestId } from '../value objects/personalDataRequestId';

export interface IPersonalDataRequestRepository {
  createPersonalDataRequest(
    dataRequestData: PersonalDataRequest,
  ): Promise<PersonalDataRequest>;
  findAllPersonalDataRequestWithUser(
    options?: any,
  ): Promise<PersonalDataRequest[]>;
  findOnePersonalDataRequest(
    dataRequestId: PersonalDataRequestId,
  ): Promise<PersonalDataRequest>;
}
