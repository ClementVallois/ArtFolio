import { PersonalDataRequest } from '../entities/data-request.entity';
import { PersonalDataRequestId } from '../value objects/personalDataRequestId';

export interface IPersonalDataRequestRepository {
  create(dataRequestData: PersonalDataRequest): Promise<PersonalDataRequest>;
  findAllPersonalDataRequestWithUser(
    options?: any,
  ): Promise<PersonalDataRequest[] | undefined>;
  findOne(dataRequestId: PersonalDataRequestId): Promise<PersonalDataRequest>;
  // remove(dataRequestData: PersonalDataRequestId): Promise<PersonalDataRequest>;
}
