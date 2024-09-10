import { PartialType } from '@nestjs/swagger';
import { CreateAmateurDto } from './create-amateur.dto';

export class UpdateAmateurDto extends PartialType(CreateAmateurDto) {}
