import { User } from '../entities/user.entity';
import { AmateurId } from '../value objects/amateurId';
import { CreateUserDto } from 'src/presentation/dto/amateur/create-user.dto';
import { UpdateUserDto } from 'src/presentation/dto/amateur/update-user.dto';

export interface IAmateurRepository {
  createAmateur(amateurData: CreateUserDto): Promise<User>;
  findAmateurById(id: AmateurId): Promise<User>;
  findAllAmateurs(): Promise<User[]>;
  removeAmateur(amateur: User): Promise<User>;
  updateAmateur(amateur: User, amateurData: UpdateUserDto): Promise<User>;
}
