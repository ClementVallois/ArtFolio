import { UpdateAmateurDto } from 'src/presentation/dto/amateur/update-amateur.dto';
import { User } from '../entities/user.entity';
import { AmateurId } from '../value objects/amateurId';
import { CreateAmateurDto } from 'src/presentation/dto/amateur/create-amateur.dto';

export interface IAmateurRepository {
  createAmateur(amateurData: CreateAmateurDto): Promise<User>;
  findAmateurById(id: AmateurId): Promise<User>;
  findAllAmateurs(): Promise<User[]>;
  removeAmateur(amateur: User): Promise<User>;
  updateAmateur(amateur: User, amateurData: UpdateAmateurDto): Promise<User>;
}
