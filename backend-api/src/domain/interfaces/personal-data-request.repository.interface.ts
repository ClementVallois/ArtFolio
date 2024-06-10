import { PersonalDataRequest } from '../entities/data-request.entity';

export interface IPersonalDataRequestRepository {
  create(dataRequestData: PersonalDataRequest): Promise<PersonalDataRequest>;
  find(options?: any): Promise<PersonalDataRequest[] | undefined>;
  remove(dataRequestData: PersonalDataRequest): Promise<PersonalDataRequest>;
}
