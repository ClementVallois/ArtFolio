import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as Amateur } from 'src/domain/entities/user.entity';
import { IAmateurRepository } from 'src/domain/interfaces/amateur.repository.interface';
import { AmateurId } from 'src/domain/value-objects/amateurId';
import { CreateAmateurDto } from 'src/presentation/dto/amateur/create-amateur.dto';
import { UpdateAmateurDto } from 'src/presentation/dto/amateur/update-amateur.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AmateurRepository implements IAmateurRepository {
  constructor(
    @InjectRepository(Amateur)
    private readonly amateurRepository: Repository<Amateur>,
  ) {}

  async findAllAmateurs(): Promise<Amateur[]> {
    return this.amateurRepository.find({
      where: { role: 'amateur' },
    });
  }

  async findAmateurById(id: AmateurId): Promise<Amateur> {
    const amateurId = id.toString();
    return this.amateurRepository.findOne({
      where: { id: amateurId, role: 'amateur' },
    });
  }

  async createAmateur(amateurData: CreateAmateurDto): Promise<Amateur> {
    const artist = this.amateurRepository.create(amateurData);
    return this.amateurRepository.save(artist);
  }

  async updateAmateur(
    amateur: Amateur,
    amateurData: UpdateAmateurDto,
  ): Promise<Amateur> {
    this.amateurRepository.merge(amateur, amateurData);
    return this.amateurRepository.save(amateur);
  }

  async removeAmateur(amateur: Amateur): Promise<Amateur> {
    return this.amateurRepository.remove(amateur);
  }
}
