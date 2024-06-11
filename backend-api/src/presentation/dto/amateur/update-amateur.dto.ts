import { PartialType } from '@nestjs/mapped-types';
import { CreateAmateurDto } from './create-amateur.dto';

export class UpdateAmateurDto extends PartialType(CreateAmateurDto) {}
