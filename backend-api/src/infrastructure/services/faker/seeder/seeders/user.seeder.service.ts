import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async clear(): Promise<void> {
    await this.userRepository.query('TRUNCATE TABLE users CASCADE');
  }

  private fakeArtistAuth0Id = [
    'auth0|663a2b09c69552569bcdaaa1',
    'auth0|663bf5dd8fe116e0253e7604',
    'auth0|663b9db9a9b8d2507c77a803',
    'auth0|663a49bfc69552569bce0b51',
    'auth0|663a4254c69552569bcdf3ef',
    'auth0|663cc406055288d79d509e13',
    'auth0|663cc4198fe116e0253ee0d6',
    'auth0|663cc42d8fe116e0253ee0e3',
    'auth0|663cc43e2775acd11124d899',
    'auth0|663cc4504b54d4701f20eea1',
    'auth0|663cc4b02775acd11124d8f1',
    'auth0|663cc5b64b54d4701f20ef88',
    'auth0|663cc5c98fe116e0253ee207',
    'auth0|663cc5da2775acd11124d9ae',
    'auth0|663cc5f92775acd11124d9c8',
    'auth0|663cc6092775acd11124d9d3',
    'auth0|663cc61e4b54d4701f20efd4',
    'auth0|663cc62d2775acd11124d9f5',
    'auth0|663cc6472775acd11124da05',
    'auth0|663cc65d4b54d4701f20f000',
    'auth0|663cc66f2775acd11124da1d',
  ];

  private fakeUserAuth0Id = [
    'auth0|663a38d0231567d2d1ed39e7',
    'auth0|663cc0252775acd11124d57a',
    'auth0|663cbfe0055288d79d509af1',
    'auth0|663cc2d1055288d79d509d20',
    'auth0|663cc2d1055288d79d509d20',
    'auth0|663cc3394b54d4701f20edd',
    'auth0|663cc34b8fe116e0253ee044',
    'auth0|663cc38c8fe116e0253ee072',
    'auth0|663cc39c4b54d4701f20ee2d',
    'auth0|663cc3e2055288d79d509df3',
  ];

  private fakeModeratorAuth0Id = ['auth0|661f88a9992913311d1add5'];

  async seed(): Promise<void> {
    await this.seedArtists();
    await this.seedUsers();
    await this.seedModerators();
  }

  private async seedArtists(): Promise<void> {
    for (const auth0Id of this.fakeArtistAuth0Id) {
      if (await this.userRepository.findOneBy({ auth0Id: auth0Id })) {
        continue;
      }
      const artist = new User();
      artist.id = faker.string.uuid();
      artist.firstName = faker.person.firstName();
      artist.lastName = faker.person.lastName();
      artist.birthDate = faker.date.birthdate();
      artist.username = faker.internet.userName({
        firstName: artist.firstName,
        lastName: artist.lastName,
      });
      artist.description = faker.lorem.words({ min: 10, max: 30 });
      artist.status = 'active';
      artist.auth0Id = auth0Id;
      artist.role = 'artist';
      artist.createdAt = faker.date.recent();
      artist.updatedAt = faker.date.recent();
      await this.userRepository.save(artist);
    }
  }

  private async seedUsers(): Promise<void> {
    for (const auth0Id of this.fakeUserAuth0Id) {
      if (await this.userRepository.findOneBy({ auth0Id: auth0Id })) {
        continue;
      }
      const user = new User();
      user.id = faker.string.uuid();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.birthDate = faker.date.birthdate();
      user.username = faker.internet.userName({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      user.description = faker.lorem.words({ min: 10, max: 30 });
      user.status = 'active';
      user.auth0Id = auth0Id;
      user.role = 'amateur';
      user.createdAt = faker.date.recent();
      user.updatedAt = faker.date.recent();
      await this.userRepository.save(user);
    }
  }

  private async seedModerators(): Promise<void> {
    for (const auth0Id of this.fakeModeratorAuth0Id) {
      if (await this.userRepository.findOneBy({ auth0Id: auth0Id })) {
        continue;
      }
      const user = new User();
      user.id = faker.string.uuid();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.birthDate = faker.date.birthdate();
      user.username = faker.internet.userName({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      user.description = faker.lorem.words({ min: 10, max: 30 });
      user.status = 'active';
      user.auth0Id = auth0Id;
      user.role = 'moderator';
      user.createdAt = faker.date.recent();
      user.updatedAt = faker.date.recent();
      await this.userRepository.save(user);
    }
  }
}
