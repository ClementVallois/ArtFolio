import { UpdatePersonalDataRequestDto } from 'src/presentation/dto/personal-data-request/update-personal-data-request.dto';
import { PersonalDataRequest } from '../entities/personal-data-request.entity';
import { PersonalDataRequestId } from '../value-objects/personalDataRequestId';
import { UserId } from '../value-objects/userId';

export interface IPersonalDataRequestRepository {
  createPersonalDataRequest(
    dataRequestData: PersonalDataRequest,
  ): Promise<PersonalDataRequest>;

  findAllPersonalDataRequestWithUser(): Promise<PersonalDataRequest[]>;

  findAllRequestedPersonalDataRequestWithUser(): Promise<PersonalDataRequest[]>;
  getPersonalDataRequestById(
    dataRequestId: PersonalDataRequestId,
  ): Promise<PersonalDataRequest>;

  getAllPersonalDataByRequestId(requestId: PersonalDataRequestId): Promise<any>;

  updatePersonalDataRequest(
    personalDataRequestId: PersonalDataRequestId,
    personalDataRequestData: UpdatePersonalDataRequestDto,
  ): Promise<PersonalDataRequest>;

  deletePersonalDataRequest(
    personalDataRequestId: PersonalDataRequestId,
  ): Promise<PersonalDataRequest>;

  getPersonalDataRequestByUserId(userId: UserId): Promise<PersonalDataRequest>;
}
