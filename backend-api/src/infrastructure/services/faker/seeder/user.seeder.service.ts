import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from 'src/infrastructure/entities/user.entity';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async clear(): Promise<void> {
    await this.userRepository.query('TRUNCATE TABLE users CASCADE');
  }

  async seed(): Promise<void> {
    const fakeData = Array.from({ length: 50 }, () => {
      const fakeEntity = new User();
      fakeEntity.id = faker.string.uuid();
      fakeEntity.firstName = faker.person.firstName();
      fakeEntity.lastName = faker.person.lastName();
      fakeEntity.birthDate = faker.date.birthdate();
      fakeEntity.username = faker.internet.userName({
        firstName: fakeEntity.firstName,
        lastName: fakeEntity.lastName,
      });
      fakeEntity.description = faker.lorem.words({ min: 10, max: 30 });
      fakeEntity.status = faker.helpers.arrayElement(['active', 'inactive']);
      fakeEntity.role = faker.helpers.arrayElement([
        'artist',
        'user',
        'moderator',
      ]);
      fakeEntity.auth0Id = faker.string.uuid();
      fakeEntity.createdAt = faker.date.recent();
      fakeEntity.updatedAt = faker.date.recent();

      return fakeEntity;
    });

    await this.userRepository.save(fakeData);
  }
}
