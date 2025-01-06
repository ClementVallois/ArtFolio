import { UpdateAmateurDto } from 'src/presentation/dto/amateur/update-amateur.dto';
import { User as Amateur } from '../entities/user.entity';
import { AmateurId } from '../value-objects/amateurId';
import { CreateAmateurDto } from 'src/presentation/dto/amateur/create-amateur.dto';

export interface IAmateurRepository {
  createAmateur(amateurData: CreateAmateurDto): Promise<Amateur>;
  findAmateurById(id: AmateurId): Promise<Amateur>;
  findAllAmateurs(): Promise<Amateur[]>;
  removeAmateur(amateur: Amateur): Promise<Amateur>;
  updateAmateur(
    amateur: Amateur,
    amateurData: UpdateAmateurDto,
  ): Promise<Amateur>;
}
