import { PartialType } from '@nestjs/mapped-types';
import { CreateDataRequestDto } from './create-data-request.dto';

export class UpdateDataRequestDto extends PartialType(CreateDataRequestDto) {}
