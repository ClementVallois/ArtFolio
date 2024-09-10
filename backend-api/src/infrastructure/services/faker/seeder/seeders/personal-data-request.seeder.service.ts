import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class DataRequestSeederService {
  constructor(
    @InjectRepository(PersonalDataRequest)
    private readonly dataRequestRepository: Repository<PersonalDataRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async clear(): Promise<void> {
    await this.dataRequestRepository.query(
      'TRUNCATE TABLE personal_data_requests CASCADE',
    );
  }

  async seed(): Promise<void> {
    await this.seedDataRequests();
  }

  private async seedDataRequests(): Promise<void> {
    const users = await this.userRepository.find();
    const fakeData = Array.from({ length: 10 }, () => {
      const user = faker.helpers.arrayElement(users);
      const fakeEntity = new PersonalDataRequest();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.user = user;
      fakeEntity.status = faker.helpers.arrayElement([
        'requested',
        'processed',
      ]);
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.dataRequestRepository.save(fakeData);
  }
}
