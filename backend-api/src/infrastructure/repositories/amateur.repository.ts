import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { CreateAmateurDto } from 'src/presentation/dto/amateur/create-amateur.dto';
import { UpdateAmateurDto } from 'src/presentation/dto/amateur/update-amateur.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AmateurRepository implements IAmateurRepository {
  constructor(
    @InjectRepository(User)
    private readonly amateurRepository: Repository<User>,
  ) {}

  async findAllAmateurs(): Promise<User[]> {
    return this.amateurRepository.find({
      where: { role: 'amateur' },
    });
  }

  async findAmateurById(id: AmateurId): Promise<User> {
    const amateurId = id.toString();
    return this.amateurRepository.findOne({
      where: { id: amateurId, role: 'amateur' },
    });
  }

  async createAmateur(amateurData: CreateAmateurDto): Promise<User> {
    const artist = this.amateurRepository.create(amateurData);
    return this.amateurRepository.save(artist);
  }

  async updateAmateur(
    amateur: User,
    amateurData: UpdateAmateurDto,
  ): Promise<User> {
    this.amateurRepository.merge(amateur, amateurData);
    return this.amateurRepository.save(amateur);
  }

  async removeAmateur(user: User): Promise<User> {
    return this.amateurRepository.remove(user);
  }
}
